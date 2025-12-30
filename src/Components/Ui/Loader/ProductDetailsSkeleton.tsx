import React from "react";

const ProductDetailsSkeleton: React.FC = () => {
  return (
    <div className="p-4 md:p-6 animate-pulse">
      <div className="flex flex-col md:flex-row gap-6 md:gap-[90px]">

        {/* LEFT: Image section */}
        <div className="flex gap-3 md:gap-4 items-start">

          {/* Thumbnails */}
          <div className="flex flex-col gap-2">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="h-12 w-12 md:h-16 md:w-16 bg-gray-400 rounded"
              />
            ))}
          </div>

          {/* Main Image */}
          <div className="flex-1 h-64 md:h-[420px] bg-gradient-to-br from-gray-300 to-gray-400 rounded-xl" />
        </div>

        {/* RIGHT: Product info */}
        <div className="flex flex-col gap-4 w-full md:w-[500px] mt-2">

          {/* Title */}
          <div className="h-7 w-3/4 bg-gray-400 rounded" />

          {/* Rating */}
          <div className="h-4 w-40 bg-gray-300 rounded" />

          {/* Price */}
          <div className="flex gap-3">
            <div className="h-6 w-24 bg-gray-400 rounded" />
            <div className="h-5 w-16 bg-gray-300 rounded" />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <div className="h-4 w-full bg-gray-300 rounded" />
            <div className="h-4 w-11/12 bg-gray-300 rounded" />
            <div className="h-4 w-10/12 bg-gray-300 rounded" />
          </div>

          {/* Quantity */}
          <div className="h-8 w-32 bg-gray-300 rounded" />

          {/* CTA Button */}
          <div className="h-12 w-full md:w-48 bg-gray-400 rounded-lg" />
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsSkeleton;
