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
    const result = await dispatch(addCartItem({ productId: product.id, quantity: 1 }));
    if (addCartItem.fulfilled.match(result)) {
      toast.success("Added to cart 🛒");
    } else {
      toast.error("Failed to add");
    }
  }, [dispatch, product.id]);

  return (
    <div className="group relative bg-white rounded-2xl border overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
    >
      {/* Discount Badge */}
      <span
        className="absolute top-2 left-2 sm:top-3 sm:left-3 z-10 bg-green-500 text-white text-[10px] sm:text-xs px-2 py-0.5 rounded-full">
        20% OFF
      </span>

      <Link to={`/product/${product.id}`} className="block">
        {/* Image */}
        <div
          className="h-40 sm:h-44 md:h-48 bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center overflow-hidden">
          <img
            src={product.imageUrls?.[0] || "/placeholder.jpg"}
            alt={product.name}
            className="h-full object-contain p-3 sm:p-4 transition-transform duration-500 group-hover:scale-110"
          />
        </div>

        {/* Content */}
        <div className="p-3 sm:p-4 space-y-1.5 sm:space-y-2">
          <h3 className="text-gray-900 font-semibold text-sm sm:text-[15px] line-clamp-2">
            {product.name}
          </h3>

          {/* Description */}
          <p className="text-[11px] sm:text-xs text-gray-500 line-clamp-2">
            {product.description || "No description available"}
          </p>

          {/* Price */}
          <div className="flex items-center gap-2 pt-1">
            <span className="text-lg sm:text-xl font-bold text-gray-900">
              ₹{product.price}
            </span>
            <span className="text-xs sm:text-sm text-gray-400 line-through">
              ₹200
            </span>
          </div>
        </div>
      </Link>

      {/* Add to Cart */}
      <div className="px-3 sm:px-4 pb-3 sm:pb-4">
        <button
          onClick={onHandleAddToCart}
          className="w-full flex items-center justify-center gap-2
                 bg-gradient-to-r from-blue-600 to-indigo-600
                 hover:from-blue-700 hover:to-indigo-700
                 active:scale-[0.97]
                 text-white text-sm font-semibold
                 py-2.5 sm:py-3
                 rounded-xl
                 transition-all duration-200"
        >
          <ShoppingCartIcon className="h-4 w-4 sm:h-5 sm:w-5" />
          Add to Cart
        </button>
      </div>
    </div>

  );
};

export default ProductCard;
