import React from "react";
import CategoriesBar from "../../Components/CategoriesBar/CategoriesBar";
import { CategoryCarouselSection } from "../../Components/CategoryCarousel/CategoryCarouselSection";

const Home: React.FC = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="sticky top-0 z-30 shadow bg-white">
        <CategoriesBar />
      </div>

      <section className="relative bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 text-white overflow-hidden">
        <div className="container mx-auto px-6 md:px-12 lg:px-24 py-16 md:py-24 flex flex-col-reverse md:flex-row items-center gap-8">
          {/* Left Text */}
          <div className="flex-1 flex flex-col gap-4">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight">
              Upgrade Your Style <br />
              <span className="text-yellow-300">Exclusive Deals</span>
            </h1>
            <p className="text-white/90 max-w-lg text-sm sm:text-base md:text-lg">
              Discover the latest trends in fashion, beauty, and lifestyle.
              Curated picks, amazing discounts — everything delivered fast.
            </p>

            <div className="flex flex-wrap gap-3 mt-4">
              <button className="bg-white text-indigo-600 font-semibold px-5 py-2.5 rounded-full shadow hover:scale-105 transform transition">
                Shop Now
              </button>
              <button className="border border-white text-white font-semibold px-5 py-2.5 rounded-full hover:bg-white hover:text-indigo-600 transition transform hover:scale-105">
                Explore Categories
              </button>
            </div>
          </div>

          <div className="flex-1 relative flex justify-center md:justify-end">
            <div className="relative w-72 sm:w-80 md:w-96 h-60 sm:h-72 md:h-80 rounded-3xl overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1200&q=80"
                alt="Hero Banner"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            </div>

            <div className="absolute -top-6 -right-6 w-16 h-16 bg-white/20 rounded-full animate-pulse"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-yellow-400/20 rounded-full blur-2xl"></div>
          </div>
        </div>
      </section>

      {/* Category Carousel Section */}
      <section className="py-10">
        <div className="container mx-auto px-6 md:px-12 lg:px-24">
          <CategoryCarouselSection />
        </div>
      </section>
    </div>
  );
};

export default Home;
