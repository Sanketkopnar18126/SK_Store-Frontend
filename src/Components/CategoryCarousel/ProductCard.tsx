import React, { useCallback } from "react";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import type { ProductResponse } from "../../API/Admin_API/adminProductApi";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../Store";
import { addCartItem } from "../../Store/Slices/cartSlice";

type Props = {
  product: ProductResponse;
};

const ProductCard: React.FC<Props> = ({ product }) => {
  const dispatch = useDispatch<AppDispatch>();

const onHandleAddToCart = useCallback(async () => {
  if (!product?.id) return;

  const result = await dispatch(addCartItem({ productId: product.id, quantity: 1 }));

  // if (addCartItem.fulfilled.match(result)) {
  //   toast.success("Added to cart!");
  // } else {
  //   toast.error("Failed to add item.");
  // }
}, [dispatch, product.id]);
  return (
    <div className="bg-white dark:bg-gray-100 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden w-72">
      {/* Discount Badge */}

      <span className="absolute top-3 left-3 bg-blue-600 text-white text-xs font-semibold px-2 py-1 rounded">
        50% OFF
      </span>

      {/* Image */}
      <div className="h-52 w-full flex items-center justify-center bg-gray-200">
        <img
          src={product.imageUrls?.[0] || "/placeholder.jpg"}
          alt={product.name}
          className="h-full object-contain"
        />
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col gap-2">
        <h3 className="text-gray-900 font-semibold text-sm md:text-base line-clamp-2">
          {product.name}
        </h3>

        {/* Price + Add to Cart */}
        <div className="mt-2 flex items-center justify-between">
          <span className="text-gray-900 font-bold text-lg">
            ${product.price}
          </span>
          <button
            onClick={onHandleAddToCart}
            className="flex items-center gap-1 bg-blue-600 hover:bg-blue-700 text-white text-sm px-3 py-1.5 rounded transition"
          >
            <ShoppingCartIcon className="h-4 w-4" />
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
