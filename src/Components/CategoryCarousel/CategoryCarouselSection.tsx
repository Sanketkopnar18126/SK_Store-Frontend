import React from "react";
import { products  } from "../../Data/ProductData";
import { ProductCarousel } from "./ProductCarousel";

export const CategoryCarouselSection: React.FC = () => {
  const categories = Array.from(new Set(products.map((p) => p.category)));

  return (
    <div className="space-y-10">
      {categories.map((category) => {
        const categoryProducts = products.filter((p) => p.category === category);

        return (
          <div key={category}>
            <h2 className="text-2xl font-bold mb-4 capitalize">{category}</h2>
            <ProductCarousel products={categoryProducts} />
          </div>
        );
      })}
    </div>
  );
};
