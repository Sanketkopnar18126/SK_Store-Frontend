import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { TrashIcon, ClockIcon } from "@heroicons/react/24/outline";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../Store";
import {
  decreaseQuantity,
  fetchCart,
  increaseQuantity,
  removeItem,
} from "../../Store/Slices/cartSlice";
import {
  selectCartItemsArray,
  selectCartSubtotal,
  selectCartTotalQty,
} from "../../Store/Selectors/cartSelectors";
import { openRazorpay } from "../../Utils/razorpay";
import { checkoutOrder } from "../../Store/Slices/OrderSlice";
import { verifyPayment } from "../../Store/Slices/PaymentSlice";


const currency = (v: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
  }).format(v);

// BUSINESS RULES
const FREE_DELIVERY_MIN = 499;
const DELIVERY_CHARGE = 49;

const CartPageModern: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [paymentProcessing, setPaymentProcessing] = React.useState(false);
  const cartItems = useSelector(selectCartItemsArray);
  const subtotal = useSelector(selectCartSubtotal);
  const totalQty = useSelector(selectCartTotalQty);
  const { loading, fetched } = useSelector((s: RootState) => s.cart);
  useEffect(() => {
    if (!fetched && !loading) {
      dispatch(fetchCart());
    }
  }, [dispatch, fetched, loading]);

  const handleCheckout = async () => {
    const payload = {
      items: cartItems.map((item) => ({
        productId: item.productId,
        quantity: item.quantity,
        price: item.unitPrice,
      })),
    };
    const result = await dispatch(checkoutOrder(payload)).unwrap();
    openRazorpay(
      result.payment,
      () => setPaymentProcessing(true),
      async (response) => {
        try {
          await dispatch(
            verifyPayment({
              orderId: response.razorpay_order_id,
              paymentId: response.razorpay_payment_id,
              signature: response.razorpay_signature,
            })
          ).unwrap();
        } finally {
          setPaymentProcessing(false);
        }
      },
      () => setPaymentProcessing(false)
    );
  };

  // DELIVERY LOGIC
  const isFreeDelivery = subtotal >= FREE_DELIVERY_MIN;
  const deliveryCharge = isFreeDelivery ? 0 : DELIVERY_CHARGE;
  const amountToFreeDelivery = Math.max(FREE_DELIVERY_MIN - subtotal, 0);
  const tax = subtotal * 0.1;
  const totalAmount = subtotal + tax + deliveryCharge;

  // EMPTY CART
  if (!cartItems.length) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="bg-white rounded-xl p-8 shadow text-center max-w-md w-full">
          <h2 className="text-2xl font-semibold mb-2">Your cart is empty</h2>
          <p className="text-gray-500 mb-6">
            Add some products to continue shopping
          </p>
          <Link to="/">
            <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl font-semibold">
              Continue Shopping
            </button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-6">
      <div className="container mx-auto px-4 lg:px-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Your Cart</h1>
          <span className="text-sm text-gray-500">{totalQty} items</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* CART ITEMS */}
          <div className="lg:col-span-8 space-y-4">
            {cartItems.map((it) => {
              const q = it.quantity ?? 1;
              const price = it.unitPrice ?? 0;

              return (
                <div
                  key={it.productId}
                  className="bg-white rounded-xl border p-4 flex gap-4 shadow-sm"
                >
                  {/* IMAGE */}
                  <div className="w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden bg-gray-100">
                    {it.productImage ? (
                      <img
                        src={it.productImage}
                        alt={it.productName}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-200" />
                    )}
                  </div>

                  {/* CONTENT */}
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <h3 className="font-semibold text-sm line-clamp-2">
                        {it.productName}
                      </h3>
                      <span className="font-semibold">{currency(price)}</span>
                    </div>

                    <div className="flex items-center gap-2 text-xs text-gray-400 mt-2">
                      <ClockIcon className="w-4 h-4" />7 days return available
                    </div>

                    <div className="flex items-center justify-between mt-4">
                      {/* QTY */}
                      <div className="flex items-center border rounded-full overflow-hidden">
                        <button
                          onClick={() =>
                            dispatch(decreaseQuantity(it.productId))
                          }
                          className="px-3 py-1 hover:bg-gray-100"
                        >
                          −
                        </button>
                        <span className="px-4 text-sm font-medium">{q}</span>
                        <button
                          onClick={() =>
                            dispatch(increaseQuantity(it.productId))
                          }
                          className="px-3 py-1 hover:bg-gray-100"
                        >
                          +
                        </button>
                      </div>

                      {/* REMOVE */}
                      <button
                        onClick={() => dispatch(removeItem(it.productId))}
                        className="text-sm text-red-600 hover:text-red-700 flex items-center gap-1"
                      >
                        <TrashIcon className="w-4 h-4" />
                        Remove
                      </button>
                    </div>

                    <div className="text-sm text-gray-500 mt-2">
                      Item Total: {currency(price * q)}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* PRICE DETAILS */}
          <aside className="lg:col-span-4">
            <div className="bg-white rounded-2xl border p-6 shadow-sm sticky top-6">
              <h4 className="text-lg font-semibold mb-4">Price Details</h4>

              <div className="flex justify-between text-sm py-2">
                <span>Subtotal</span>
                <span>{currency(subtotal)}</span>
              </div>

              <div className="flex justify-between text-sm py-2">
                <span>Tax (10%)</span>
                <span>{currency(tax)}</span>
              </div>

              <div className="flex justify-between text-sm py-2 border-b">
                <span>Delivery</span>
                {isFreeDelivery ? (
                  <span className="text-green-600 font-semibold">FREE</span>
                ) : (
                  <span>{currency(deliveryCharge)}</span>
                )}
              </div>

              {!isFreeDelivery && (
                <div className="mt-4 bg-indigo-50 border border-indigo-100 rounded-xl p-3">
                  <p className="text-sm text-indigo-700 font-medium">
                    Add{" "}
                    <span className="font-bold">
                      {currency(amountToFreeDelivery)}
                    </span>{" "}
                    more to get FREE delivery
                  </p>

                  <div className="mt-2 h-2 bg-indigo-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-indigo-600"
                      style={{
                        width: `${Math.min(
                          (subtotal / FREE_DELIVERY_MIN) * 100,
                          100
                        )}%`,
                      }}
                    />
                  </div>
                </div>
              )}

              <div className="flex justify-between py-4">
                <span className="text-lg font-semibold">Total</span>
                <span className="text-lg font-bold">
                  {currency(totalAmount)}
                </span>
              </div>

              <button
                onClick={handleCheckout}
                disabled={paymentProcessing}
                className={`w-full py-3 rounded-xl font-semibold shadow-lg
                    ${
                      paymentProcessing
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white"
                    }`}
              >
                {paymentProcessing
                  ? "Processing payment..."
                  : "Proceed to Checkout"}
              </button>

              <p className="text-xs text-center text-gray-400 mt-3">
                🔒 Secure payments • Easy returns
              </p>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default CartPageModern;
