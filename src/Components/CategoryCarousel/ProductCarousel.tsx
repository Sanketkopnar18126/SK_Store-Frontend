import React from "react";
import useEmblaCarousel from "embla-carousel-react";
import ProductCard from "./ProductCard";
import { ArrowLeft, ArrowRight } from "lucide-react";
import type { Product } from "../../Data/ProductData";

type Props = { products: Product[] };

export const ProductCarousel: React.FC<Props> = ({ products }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    dragFree: false,
    containScroll: "trimSnaps",
  });

  const scrollPrev = () => emblaApi?.scrollPrev();
  const scrollNext = () => emblaApi?.scrollNext();

  return (
    <div className="relative group">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex gap-4">
          {products.map((product) => (
            <div
              key={product.id}
              className="flex-shrink-0 w-[220px] md:w-[250px] lg:w-[280px]"
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
      <button
        onClick={scrollPrev}
        className="absolute left-0 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow
             opacity-50 md:opacity-20 md:group-hover:opacity-100 transition-opacity duration-300"
      >
        <ArrowLeft />
      </button>
      <button
        onClick={scrollNext}
        className="absolute right-0 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow
             opacity-50 md:opacity-20 md:group-hover:opacity-100 transition-opacity duration-300"
      >
        <ArrowRight />
      </button>
    </div>
  );
};
