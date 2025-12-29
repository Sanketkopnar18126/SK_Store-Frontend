import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../Store";
import { addCartItem } from "../../Store/Slices/cartSlice";
import {
  getProductById,
  getRecommendedProducts,
} from "../../Store/Slices/ProductSlice";
import type { ProductResponse } from "../../API/Admin_API/adminProductApi";
import { ProductCarousel } from "../../Components/CategoryCarousel/ProductCarousel";

const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch<AppDispatch>();

  const { selectedProduct, loading, error, recommended } = useSelector(
    (state: RootState) => state.products
  );

  const [activeImage, setActiveImage] = useState<string>("");
  console.log("r", recommended);
  // Fetch product on mount
  useEffect(() => {
    if (id) {
      dispatch(getProductById(id));
      dispatch(getRecommendedProducts(8));
    }
  }, [id, dispatch]);

  // Set default active image when product is loaded
  useEffect(() => {
    if (selectedProduct?.imageUrls?.length) {
      setActiveImage(selectedProduct.imageUrls[0]);
    }
  }, [selectedProduct]);

  if (loading || !selectedProduct) {
    return <div className="p-6 text-center">Loading...</div>;
  }

  if (error) {
    return <div className="p-6 text-center text-red-500">{error}</div>;
  }

  const recommendedProducts: ProductResponse[] = recommended
    ? Object.values(recommended).flat()
    : [];

  return (
    <div className=" p-4 md:p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        
        {/* ================= IMAGE GALLERY ================= */}
        <div className="flex gap-4 items-start">
          {/* Thumbnails */}
          <div className="flex md:flex-col gap-2 overflow-auto">
            {selectedProduct.imageUrls?.map((img: string, index: number) => (
              <img
                key={index}
                src={img}
                alt="thumb"
                onClick={() => setActiveImage(img)}
                className={`h-16 w-16 object-contain border rounded cursor-pointer ${
                  activeImage === img ? "border-blue-600" : "border-gray-300"
                }`}
              />
            ))}
          </div>

          {/* Main Image */}
          <div className="flex-1 bg-gray-100 rounded-xl flex items-center justify-start h-80 md:h-[420px] p-2">
            <img
              src={activeImage}
              alt={selectedProduct.name}
              className="max-h-full max-w-full object-contain"
            />
          </div>
        </div>

        {/* ================= PRODUCT INFO ================= */}
        <div className="flex flex-col gap-4">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
            {selectedProduct.name}
          </h1>

          {/* Price Section */}
          <div className="flex items-center gap-3">
            <span className="text-2xl font-bold text-gray-900">
              ₹{selectedProduct.price}
            </span>
            <span className="text-gray-400 line-through">₹50</span>
          </div>

          {/* Description */}
          <p className="text-gray-600 leading-relaxed">
            {selectedProduct.description}
          </p>

          {/* Add to Cart */}
          <button
            onClick={() =>
              dispatch(
                addCartItem({ productId: selectedProduct.id, quantity: 1 })
              )
            }
            className="mt-4 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg transition w-full md:w-auto"
          >
            <ShoppingCartIcon className="h-5 w-5" />
            Add to Cart
          </button>
        </div>
      </div>

      {recommendedProducts.length > 0 && (
        <div className="space-y-4 mt-12">
          <h1 className="text-xl md:text-2xl font-semibold">Recommended Products</h1>
          <ProductCarousel products={recommendedProducts} />
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
