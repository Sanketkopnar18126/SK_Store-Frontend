import React, { useCallback } from "react";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import type { ProductResponse } from "../../API/Admin_API/adminProductApi";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../Store";
import { addCartItem } from "../../Store/Slices/cartSlice";
import { toast } from "sonner";
import { Link } from "react-router-dom";

type Props = {
  product: ProductResponse;
};

const ProductCard: React.FC<Props> = ({ product }) => {
  const dispatch = useDispatch<AppDispatch>();

  const onHandleAddToCart = useCallback(async () => {
    if (!product?.id) return;

    const result = await dispatch(
      addCartItem({ productId: product.id, quantity: 1 })
    );

    if (addCartItem.fulfilled.match(result)) {
      toast.success("Added to cart");
    } else {
      toast.error("Failed to add");
    }
  }, [dispatch, product.id]);

  return (
    <div
      className="group bg-white rounded-2xl border overflow-hidden 
                    transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
    >
      {/* Product Link */}
      <Link to={`/product/${product.id}`} className="block">
        {/* Image */}
        <div className="h-48 bg-gray-100 flex items-center justify-center">
          <img
            src={product.imageUrls?.[0] || "/placeholder.jpg"}
            alt={product.name}
            className="h-full object-contain p-3 transition-transform duration-300 group-hover:scale-105"
          />
        </div>

        {/* Content */}
        <div className="p-4 space-y-2">
          <h3 className="text-gray-900 font-semibold text-sm line-clamp-2">
            {product.name}
          </h3>

          <div className="flex items-center gap-2">
            <span className="text-lg font-bold text-gray-900">
              ₹{product.price}
            </span>
            <span className="text-sm text-gray-400 line-through">₹200</span>
          </div>
        </div>
      </Link>

      {/* Add to Cart */}
      <div className="px-4 pb-4">
        <button
          onClick={onHandleAddToCart}
          className="w-full flex items-center justify-center gap-2
                     bg-blue-600 hover:bg-blue-700 active:scale-[0.98]
                     text-white text-sm font-medium
                     py-2 rounded-xl transition-all"
        >
          <ShoppingCartIcon className="h-4 w-4" />
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
