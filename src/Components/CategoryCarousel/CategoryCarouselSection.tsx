import React from "react";
import {  Typography } from "@mui/material";
import { products } from "../../Data/ProductData";
import { ProductCarousel } from "./ProductCarousel";

export const CategoryCarouselSection: React.FC = () => {
  const categories = Array.from(new Set(products.map((p) => p.category)));

  return (
    <div className="space-y-10">
      {categories.map((category) => {
        const categoryProducts = products.filter((p) => p.category === category);
        return (
          <div key={category}>
            <Typography variant="h5" fontWeight="bold" gutterBottom sx={{ textTransform: "capitalize" }}>
              {category}
            </Typography>
            <ProductCarousel products={categoryProducts} />
          </div>
        );
      })}
    </div>
  );
};
