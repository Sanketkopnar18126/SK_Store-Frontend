import React from "react";
import {
  ShoppingCartIcon,
} from "@heroicons/react/24/outline";

type Props = {
  product: {
    name: string;
    imageUrl?: string;
    price: number;
    discount?: number;
  };
};

const ProductCard: React.FC<Props> = ({ product }) => {
  return (
    <div className="bg-white dark:bg-gray-100 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden w-72">
      {/* Discount Badge */}
      {product.discount && (
        <span className="absolute top-3 left-3 bg-blue-600 text-white text-xs font-semibold px-2 py-1 rounded">
          {product.discount}% OFF
        </span>
      )}

      {/* Image */}
      <div className="h-52 w-full flex items-center justify-center bg-gray-200">
        <img
          // src={product.image}
          alt={product.name}
          className="h-full object-contain"
        />
      </div>

      {/* Action Icons */}
      {/* <div className="absolute top-3 right-3 flex gap-2">
        <button className="p-1 rounded-full bg-white hover:bg-gray-100 shadow transition">
          <EyeIcon className="h-4 w-4 text-gray-700" />
        </button>
        <button className="p-1 rounded-full bg-white hover:bg-gray-100 shadow transition">
          <HeartIcon className="h-4 w-4 text-gray-700" />
        </button>
      </div> */}

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
          <button className="flex items-center gap-1 bg-blue-600 hover:bg-blue-700 text-white text-sm px-3 py-1.5 rounded transition">
            <ShoppingCartIcon className="h-4 w-4" />
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
