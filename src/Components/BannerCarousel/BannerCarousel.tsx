import React, { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../Store";
import { getAllBanners } from "../../Store/Slices/BannerSlice";

const AUTO_PLAY_DELAY = 4000;

const BannerCarousel: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { banners, loading } = useSelector(
    (state: RootState) => state.banner
  );

  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [selectedIndex, setSelectedIndex] = useState(0);

  // Fetch banners ONCE
  useEffect(() => {
    dispatch(getAllBanners());
  }, [dispatch]);

  // Track selected slide
  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  // Auto play
  // useEffect(() => {
  //   if (!emblaApi || banners.length === 0) return;

  //   const timer = setInterval(() => {
  //     emblaApi.scrollNext();
  //   }, AUTO_PLAY_DELAY);

  //   emblaApi.on("select", onSelect);
  //   onSelect();

  //   return () => clearInterval(timer);
  // }, [emblaApi, onSelect, banners.length]);

  // Loader
  if (loading) {
    return (
      <div className="w-full h-[220px] sm:h-[300px] md:h-[360px] bg-gray-200 animate-pulse rounded-lg" />
    );
  }

  if (!banners.length) return null;

  return (
    <div className="relative w-full overflow-hidden rounded-lg">
      {/* Embla viewport */}
      <div ref={emblaRef} className="overflow-hidden w-full">
        <div className="flex">
          {banners.map((banner) => (
            <div
              key={banner.id}
              className="flex-[0_0_100%] bg-gray-100 flex items-center justify-center"
            >
              {/* THIS IMAGE SETUP WILL NEVER BREAK */}
              <img
                src={banner.imageUrl}
                alt="banner"
                className="w-full h-auto max-h-[360px] object-contain"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Left arrow
      <button
        onClick={() => emblaApi?.scrollPrev()}
        className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow"
      >
        <ChevronLeft size={20} />
      </button> */}

      {/* Right arrow */}
      {/* <button
        onClick={() => emblaApi?.scrollNext()}
        className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow"
      >
        <ChevronRight size={20} />
      </button> */}

      {/* Dots */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
        {banners.map((_, i) => (
          <button
            key={i}
            onClick={() => emblaApi?.scrollTo(i)}
            className={`h-2 w-2 rounded-full ${
              selectedIndex === i ? "bg-black" : "bg-black/40"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default BannerCarousel;
