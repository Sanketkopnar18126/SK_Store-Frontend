import React, { useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";
import ProductCard from "./ProductCard";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import type { ProductResponse } from "../../API/Admin_API/adminProductApi";
import ProductCardSkeleton from "../Ui/Loader/ProductCardSkeleton";

type Props = {
  products: ProductResponse[];
  loading?:boolean
};

export const ProductCarousel: React.FC<Props> = ({ products ,loading}) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    dragFree: false,
    containScroll: "trimSnaps",
  });
  const scrollPrev = () => emblaApi?.scrollPrev();
  const scrollNext = () => emblaApi?.scrollNext();
  
  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.reInit();
  }, [emblaApi, products.length]);

  return (

    <div className="relative">
      {/* Carousel Container */}
      <div ref={emblaRef} className="overflow-hidden">
          <div className="flex gap-4 px-2">
            {loading
              ? Array.from({ length: 6 }).map((_, index) => (
                  <div key={index} className="flex-none w-72">
                    <ProductCardSkeleton />
                  </div>
                ))
              : products.map((product) => (
                  <div key={product.id} className="flex-none w-72">
                    <ProductCard product={product} />
                  </div>
                ))}
          </div>
      </div>

      {/* Left Arrow */}
      <button
        onClick={scrollPrev}
        className="absolute top-1/2 left-0 -translate-y-1/2 p-2 bg-white shadow rounded-full hover:bg-gray-100 z-10"
      >
        <ArrowBackIos className="h-5 w-5 text-gray-700" />
      </button>

      {/* Right Arrow */}
      <button
        onClick={scrollNext}
        className="absolute top-1/2 right-0 -translate-y-1/2 p-2 bg-white shadow rounded-full hover:bg-gray-100 z-10"
      >
        <ArrowForwardIos className="h-5 w-5 text-gray-700" />
      </button>
    </div>
  );
};
