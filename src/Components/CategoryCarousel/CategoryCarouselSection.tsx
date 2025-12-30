import React from "react";
import {  Typography } from "@mui/material";
import { ProductCarousel } from "./ProductCarousel";
import type { ProductResponse } from "../../API/Admin_API/adminProductApi";

type Props = {
  productsMap: Record<string, ProductResponse[]>;
  loading?: boolean;
};
export const CategoryCarouselSection: React.FC<Props> = ({productsMap,loading}) => {
   const categories = Object.keys(productsMap || {});
  return (
    <div className="space-y-10">
       {categories.map((category) => {
        const categoryProducts = productsMap[category] ?? [];
        return (
          <div key={category}>
            <div className="flex items-center justify-between mb-3">
              <Typography
                variant="h5"
                fontWeight="bold"
                gutterBottom
                sx={{ textTransform: "capitalize" }}
              >
                {category}
              </Typography>
            </div>

            <ProductCarousel products={categoryProducts} loading={loading} />
          </div>
        );
      })}
    </div>
  );
};
