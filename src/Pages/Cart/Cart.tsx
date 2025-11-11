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

const currency = (v: number) =>
  new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR" }).format(
    v
  );

const CartPageModern: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const cartItems = useSelector(selectCartItemsArray);
  const totalQty = useSelector(selectCartTotalQty);
  const subtotal = useSelector(selectCartSubtotal);
  const { loading, fetched } = useSelector((s: RootState) => s.cart);

  useEffect(() => {
    if (!fetched && !loading) {
      dispatch(fetchCart());
    }
  }, [dispatch, fetched, loading]);

  // Empty cart check
  if (!cartItems.length) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-6">
          <div className="bg-white rounded-lg p-12 shadow text-center">
            <h2 className="text-2xl font-semibold mb-2">Your Cart is empty</h2>
            <p className="text-gray-500 mb-6">
              Looks like you haven't added any products yet.
            </p>
            <Link to="/" className="inline-block">
              <button className="bg-black text-white px-5 py-2 rounded-md">
                Continue shopping
              </button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Your Cart</h1>
          <div className="text-sm text-gray-500">{totalQty} items in cart</div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* LEFT: Items list */}
          <div className="lg:col-span-8 space-y-6">
            {cartItems.map((it) => {
              const id = it.productId;
              const q = it.quantity ?? 1;
              const name = it.productName ?? "Unnamed Product";
              const price = it.unitPrice ?? 0;
              const img = it.productImage;

              return (
                <div
                  key={id}
                  className="bg-white rounded-lg border border-gray-200 p-4 flex flex-col sm:flex-row gap-4 items-start sm:items-center shadow-sm hover:shadow-md transition"
                >
                  {/* Image */}
                  <div className="w-full sm:w-28 flex-shrink-0">
                    <div className="w-full h-40 sm:h-28 rounded-md overflow-hidden bg-gray-100 flex items-center justify-center">
                      {img ? (
                        <img
                          src={img}
                          alt={name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-200" />
                      )}
                    </div>
                  </div>

                  {/* Main content */}
                  <div className="flex-1 w-full">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                      <div className="min-w-0">
                        <h3 className="text-base font-semibold truncate">
                          {name}
                        </h3>
                        <div className="flex items-center gap-2 text-sm text-gray-400 mt-3">
                          <ClockIcon className="w-4 h-4 text-gray-400" />
                          <span>7 days return available</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-semibold">
                          {currency(price)}
                        </div>
                      </div>
                    </div>

                    {/* bottom row: qty + remove */}
                    <div className="mt-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div className="inline-flex items-center rounded-full border border-gray-200 overflow-hidden">
                          <button
                            className="px-3 py-1 text-sm hover:bg-gray-100"
                            onClick={() => dispatch(decreaseQuantity(id))}
                          >
                            −
                          </button>
                          <div className="px-4 py-1 text-sm font-medium min-w-[36px] text-center">
                            {q}
                          </div>
                          <button
                            className="px-3 py-1 text-sm hover:bg-gray-100"
                            onClick={() => dispatch(increaseQuantity(id))}
                          >
                            +
                          </button>
                        </div>
                        <div className="text-sm text-gray-500">
                          {currency(price * q)}
                        </div>
                      </div>

                      <button
                        onClick={() => dispatch(removeItem(id))}
                        className="inline-flex items-center gap-2 text-sm text-red-600 hover:text-red-700 px-2 py-1 rounded-md border border-transparent hover:bg-red-50 transition"
                      >
                        <TrashIcon className="w-4 h-4" />
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* RIGHT: Price Details */}
          <aside className="lg:col-span-4 space-y-6">
            <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
              <h4 className="text-lg font-semibold mb-3">Price Details</h4>

              <div className="flex justify-between py-2 border-b border-gray-100">
                <div className="text-sm text-gray-600">Subtotal</div>
                <div className="font-medium">{currency(subtotal)}</div>
              </div>

              <div className="flex justify-between py-2 border-b border-gray-100">
                <div className="text-sm text-gray-600">Tax (10%)</div>
                <div className="font-medium">{currency(subtotal * 0.1)}</div>
              </div>

              <div className="flex justify-between py-4 border-b border-gray-100">
                <div className="text-sm text-gray-600">Shipping</div>
                <div className="font-medium text-gray-700">Free Delivery</div>
              </div>

              <div className="flex justify-between py-4">
                <div className="text-lg font-semibold">Total</div>
                <div className="text-lg font-bold">
                  {currency(subtotal * 1.1)}
                </div>
              </div>

              <button
                className="w-full bg-black text-white py-3 rounded-md mt-2"
                onClick={() =>
                  alert("Confirm Payment clicked (not implemented)")
                }
              >
                Confirm Payment
              </button>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default CartPageModern;
