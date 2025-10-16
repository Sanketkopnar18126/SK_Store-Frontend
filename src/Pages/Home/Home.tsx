// src/pages/Home.tsx
import React from "react";
import CategoriesBar from "../../Components/CategoriesBar/CategoriesBar";
import { products } from "../../Data/ProductData";
import { Button } from "../../Components/Ui/button";
import { Card, CardContent, CardFooter } from "../../Components/Ui/card";
import { Badge } from "../../Components/Ui/badge";

const Home: React.FC = () => {


  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Categories Navbar */}
      <CategoriesBar className="sticky top-0 z-30 shadow-sm" />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center py-12">
            <div>
              <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight text-gray-900">
                Discover beauty, fragrance & style
              </h1>
              <p className="mt-4 text-lg text-gray-600 max-w-xl">
                Curated collection of cosmetics, agarbatti, dhoop, jewelry and
                more — handpicked for you.
              </p>

              <div className="mt-6 flex gap-3">
                <Button asChild>
                  <a
                    href="/shop"
                    className="inline-flex items-center px-4 py-2"
                  >
                    Shop Now
                  </a>
                </Button>
                <Button variant="outline" asChild>
                  <a
                    href="/about"
                    className="inline-flex items-center px-4 py-2"
                  >
                    Learn More
                  </a>
                </Button>
              </div>

              <div className="mt-6 flex gap-4 flex-wrap text-sm text-gray-500">
                <div className="inline-flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-rose-500" /> Free
                  shipping over ₹999
                </div>
                <div className="inline-flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-indigo-500" /> Secure
                  payments
                </div>
              </div>
            </div>

            {/* Hero image / promo card */}
            <div className="order-first lg:order-last -mx-4 sm:mx-0">
              <div className="bg-white rounded-2xl shadow-lg p-4 md:p-8 flex items-center gap-6">
                <img
                  src="/images/hero-collage.jpg"
                  alt="Aurora Collections"
                  className="w-44 h-44 object-cover rounded-lg hidden sm:block"
                />
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">
                    Festive Picks
                  </h3>
                  <p className="mt-2 text-gray-600">
                    Top trending cosmetics and fragrances — limited time offers.
                  </p>
                  <div className="mt-4">
                    {/* onClick={() => (cart ? cart.add({ id: 9999, name: "Gift Box", price: 499, image: "/images/placeholder.png", slug: "gift-box" }, 1) : null)} */}
                    <Button>Add Gift Box</Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Products grid */}
      <section className="max-w-7xl mx-auto py-10 px-4">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Featured Products
        </h2>

        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {products.map((product,index) => (
            <Card key={index} className="overflow-hidden border border-gray-200 hover:shadow-xl rounded-2xl transform hover:-translate-y-1 transition">
              <div className="relative">
                <div className="aspect-[4/3] w-full bg-gray-100">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {product.inStock === false && (
                  <Badge className="absolute top-3 left-3 bg-rose-600 text-white">
                    Out of stock
                  </Badge>
                )}

                {product.discount && (
                  <Badge className="absolute top-3 right-3 bg-green-500 text-white">
                    {Math.round((product.discount / product.price) * 100)}% OFF
                  </Badge>
                )}
              </div>

              <CardContent className="p-4">
                <h3 className="text-sm font-semibold text-gray-900 truncate">
                  {product.name}
                </h3>
                <p className="mt-2 text-xs text-gray-500 line-clamp-2">
                  {product.description}
                </p>
              </CardContent>

              <CardFooter className="p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                <div className="flex flex-col">
                  {product.discount ? (
                    <div className="flex items-center gap-2">
                      <span className="text-gray-400 line-through text-sm">
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
                  <div className="text-xs text-gray-500">
                    Inclusive of taxes
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {product.inStock ? (
                    <Button
                      size="sm"
                      className="relative overflow-hidden px-5 py-2 rounded-full bg-indigo-600 text-white font-semibold shadow-md hover:shadow-lg transition-all duration-300 group"
                    >
                      <span className="absolute inset-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 blur-sm transition-opacity duration-500"></span>
                      <span className="relative flex items-center gap-2 z-10">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.8"
                          stroke="currentColor"
                          className="w-4 h-4 group-hover:rotate-12 transition-transform"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.3 5.2A1 1 0 007 20h10m-5-7v7"
                          />
                        </svg>
                        Add to Cart
                      </span>
                    </Button>
                  ) : (
                    <Button
                      size="sm"
                      disabled
                      className="relative overflow-hidden px-5 py-2 rounded-full bg-gradient-to-r from-gray-200 to-gray-300 text-gray-600 font-medium shadow-inner cursor-not-allowed flex items-center gap-2 opacity-80"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="w-4 h-4 text-gray-500"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                      Out of Stock
                    </Button>
                  )}
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
