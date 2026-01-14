import React, { useEffect } from "react";
import CategoriesBar from "../../Components/CategoriesBar/CategoriesBar";
import { CategoryCarouselSection } from "../../Components/CategoryCarousel/CategoryCarouselSection";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../Store";
import { getAllProducts } from "../../Store/Slices/ProductSlice";
import BannerCarousel from "../../Components/BannerCarousel/BannerCarousel";

const Home: React.FC = () => {

  const dispatch = useDispatch<AppDispatch>();
  const productsMap = useSelector((state: RootState) => state.products.products);
  const loading = useSelector((state: RootState) => state.products.loading);

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);


  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="sticky top-0 z-30 shadow bg-white">
        <CategoriesBar />
      </div>


      <div className="w-full max-w-screen-xl mx-auto px-4">
        <BannerCarousel />
      </div>

      {/* Category Carousel Section */}
      <section className="py-10">
        <div className="container mx-auto px-6 md:px-12 lg:px-24">
          <CategoryCarouselSection productsMap={productsMap} loading={loading} />
        </div>
      </section>
    </div>
  )
};

export default Home;
