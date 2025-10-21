import React from "react";
import CategoriesBar from "../../Components/CategoriesBar/CategoriesBar";
import { CategoryCarouselSection } from "../../Components/CategoryCarousel/CategoryCarouselSection";
import { Button } from "../../Components/Ui/button";

const Home: React.FC = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="relative z-30">
        <CategoriesBar className="sticky top-0 shadow-sm" />
      </div>
      <section
        className="relative overflow-hidden bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white"
        aria-label="Hero"
      >
        <div className="max-w-7xl mx-auto px-6 py-12 md:py-20">
          <div className="flex flex-col-reverse md:flex-row items-center md:items-stretch gap-8">
            <div className="w-full md:w-1/2 flex flex-col justify-center text-center md:text-left">
              <h1 className="text-3xl md:text-5xl font-extrabold leading-tight">
                Upgrade Your Style with
                <br />
                <span className="text-yellow-300">Exclusive Deals</span>
              </h1>

              <p className="mt-4 text-sm md:text-lg text-white/90 max-w-xl mx-auto md:mx-0">
                Discover the latest trends in fashion, beauty, and lifestyle.
                Curated picks, amazing discounts — everything delivered fast.
              </p>

              <div className="mt-6 flex justify-center md:justify-start gap-3">
                <Button className="bg-white text-indigo-600 font-semibold px-5 py-2 rounded-full shadow hover:bg-gray-100 transition">
                  Shop Now
                </Button>
                <Button className="bg-transparent border border-white text-white px-5 py-2 rounded-full hover:bg-white hover:text-indigo-600 transition">
                  Explore Categories
                </Button>
              </div>
            </div>

            <div className="w-full md:w-1/2 flex justify-center md:justify-end">
              <img
                src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1200&q=80"
                alt="Hero banner"
                className="w-full max-w-md md:max-w-lg rounded-2xl shadow-2xl object-cover
                           h-40 sm:h-56 md:h-72 lg:h-96"
                style={{ objectPosition: "center" }}
                loading="lazy"
              />
            </div>
          </div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent pointer-events-none" />
      </section>
      <section className="max-w-7xl mx-auto py-10 px-4">
        <CategoryCarouselSection />
      </section>
    </div>
  );
};

export default Home;
