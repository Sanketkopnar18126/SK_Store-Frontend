import React, { memo } from "react";
import { Card, CardContent, CardFooter } from "../Ui/card";
import { Badge } from "../Ui/badge";
import { Button } from "../Ui/button";
import type { Product } from "../../Data/ProductData";

type Props = { product: Product };

const ProductCard: React.FC<Props> = memo(({ product }) => {
  return (
    <Card className="relative flex flex-col overflow-hidden border border-gray-200 rounded-2xl hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300">
      <div className="relative w-full aspect-[4/3] overflow-hidden rounded-t-2xl">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          loading="lazy"
        />
        {!product.inStock && (
          <Badge className="absolute top-3 left-3 bg-red-600 text-white">
            Out of stock
          </Badge>
        )}
        {product.discount && (
          <Badge className="absolute top-3 right-3 bg-green-500 text-white">
            {Math.round((product.discount / product.price) * 100)}% OFF
          </Badge>
        )}
      </div>
      <CardContent className="flex-1 p-4 flex flex-col">
        <h4 className="text-sm font-semibold text-gray-900 truncate">
          {product.name}
        </h4>
        <p className="mt-1 text-xs text-gray-500 line-clamp-2">
          {product.description}
        </p>
      </CardContent>
      <CardFooter className="p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex flex-col">
          {product.discount ? (
            <div className="flex items-center gap-2">
              <span className="line-through text-gray-400 text-sm">
                ₹{product.price}
              </span>
              <span className="text-indigo-600 font-bold text-lg">
                ₹{product.price - product.discount}
              </span>
            </div>
          ) : (
            <span className="text-indigo-600 font-bold text-lg">
              ₹{product.price}
            </span>
          )}
          <span className="text-xs text-gray-400">Inclusive of taxes</span>
        </div>
        <Button
          size="sm"
          disabled={!product.inStock}
          className="px-4 py-2 rounded-full hover:bg-indigo-700 transition-colors"
        >
          {product.inStock ? "Add to Cart" : "Out of Stock"}
        </Button>
      </CardFooter>
    </Card>
  );
});

ProductCard.displayName = "ProductCard";

export default ProductCard;
