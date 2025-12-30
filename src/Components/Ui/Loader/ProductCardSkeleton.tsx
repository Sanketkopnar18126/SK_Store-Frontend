import React from "react";

const ProductCardSkeleton: React.FC = () => {
  return (
    <div className="relative bg-white rounded-2xl border overflow-hidden animate-pulse">
      
      {/* Discount badge */}
      <div className="absolute top-2 left-2 h-5 w-14 rounded-full bg-gray-400" />

      {/* Image skeleton */}
      <div className="h-40 sm:h-44 md:h-48 bg-gradient-to-br from-gray-300 to-gray-400" />

      {/* Content */}
      <div className="p-3 sm:p-4 space-y-2">
        {/* Title */}
        <div className="h-4 rounded bg-gray-400 w-3/4" />

        {/* Description */}
        <div className="h-3 rounded bg-gray-300 w-full" />
        <div className="h-3 rounded bg-gray-300 w-5/6" />

        {/* Price */}
        <div className="flex items-center gap-2 pt-2">
          <div className="h-5 w-16 rounded bg-gray-400" />
          <div className="h-4 w-10 rounded bg-gray-300" />
        </div>
      </div>

      {/* Button */}
      <div className="px-3 sm:px-4 pb-3 sm:pb-4">
        <div className="h-10 rounded-xl bg-gray-400" />
      </div>
    </div>
  );
};

export default ProductCardSkeleton;
