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
import { toast } from "sonner";
import ProductDetailsSkeleton from "../../Components/Ui/Loader/ProductDetailsSkeleton";

const ProductDetails: React.FC = () => {

  const [activeImage, setActiveImage] = useState<string>("");
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch<AppDispatch>();

  const { selectedProduct, loading, recommended } = useSelector(
    (state: RootState) => state.products
  );


const handleAddToCart = async () => {
  try {
    if (!selectedProduct?.id) return;
    const result = await dispatch(
      addCartItem({ productId: selectedProduct.id, quantity: 1 })
    );

    if (addCartItem.fulfilled.match(result)) {
      toast.success("Added to cart 🛒");
    } else {
      toast.error("Failed to add product");
    }
  } catch (error) {
    toast.error("Something went wrong");
  }
};
 
  useEffect(() => {
    if (id) {
      dispatch(getProductById(id));
      dispatch(getRecommendedProducts(8));
    }
  }, [id, dispatch]);

  
  useEffect(() => {
    if (selectedProduct?.imageUrls?.length) {
      setActiveImage(selectedProduct.imageUrls[0]);
    }
  }, [selectedProduct]);

    if (loading|| !selectedProduct) {
      return <ProductDetailsSkeleton />;
    }

  const recommendedProducts: ProductResponse[] = recommended
    ? Object.values(recommended).flat()
    : [];

  return (

    <div className="p-4 md:p-6">
      <div className="flex flex-col md:flex-row gap-6 md:gap-[90px]">
        {/* ================= IMAGE GALLERY ================= */}
        <div className="flex gap-3 md:gap-4 items-start">
          {/* Thumbnails */}
          <div className="flex md:flex gap-2 overflow-auto flex-col">
            {selectedProduct.imageUrls?.map((img: string, index: number) => (
              <img
                key={index}
                src={img}
                alt="thumb"
                onClick={() => setActiveImage(img)}
                className={`h-12 w-12 md:h-16 md:w-16
              object-contain border rounded cursor-pointer
              ${activeImage === img ? "border-blue-600" : "border-gray-300"}`}
              />
            ))}
          </div>

          {/* Main Image */}
          <div className="flex-1 bg-gray-100 rounded-xl flex items-center justify-center h-64 md:h-80 md:h-[420px] p-2">
            <img
              src={activeImage}
              alt={selectedProduct.name}
              className="max-h-full max-w-full object-contain"
            />
          </div>
        </div>

        {/* ================= PRODUCT INFO ================= */}

        <div className="flex flex-col gap-3 md:gap-4 w-full md:w-[500px] mt-2 md:mt-4">
          <h1 className="text-xl md:text-3xl font-bold text-gray-900">
            {selectedProduct.name}
          </h1>

          <div className="flex items-center gap-2 text-sm">
            <span className="text-yellow-500">★★★★★</span>
            <span className="text-gray-600">(4.6)</span>
            <span className="text-gray-400">| 128 reviews</span>
          </div>

          {/* Price Section */}
          <div className="flex items-center gap-2 md:gap-3">
            <span className="text-xl md:text-2xl font-bold text-gray-900">
              ₹{selectedProduct.price}
            </span>
            <span className="text-sm md:text-base text-gray-400 line-through">
              ₹50
            </span>
            <span className="text-green-600 text-sm font-medium">In stock</span>
          </div>

          {/* Description */}
          <p className="text-sm md:text-base text-gray-600 leading-relaxed">
            {selectedProduct.description}
          </p>

          <div className="flex items-center gap-3">
            <span className="text-sm font-medium text-gray-700">Quantity</span>
            <div className="flex items-center border rounded-md overflow-hidden">
              <button className="px-3 py-1 text-gray-600 hover:bg-gray-100">
                −
              </button>
              <span className="px-4 py-1 text-sm">1</span>
              <button className="px-3 py-1 text-gray-600 hover:bg-gray-100">
                +
              </button>
            </div>
          </div>

          <div className="text-sm text-gray-600 space-y-1">
            <p>🚚 Free delivery on orders above ₹499</p>
            <p>💳 Cash on Delivery available</p>
            <p>🔄 7 days replacement</p>
          </div>

          {/* Add to Cart */}
          <button
            onClick={handleAddToCart}
            className="mt-2 md:mt-4 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700
                   text-white text-sm md:text-base
                   py-2 md:py-3 rounded-lg
                   transition w-full md:w-auto"
          >
            <ShoppingCartIcon className="h-4 w-4 md:h-5 md:w-5" />
            Add to Cart
          </button>
        </div>
      </div>

      {recommendedProducts.length > 0 && (
        <div className="space-y-4 mt-12">
          <h1 className="text-xl md:text-2xl font-semibold">
            Recommended Products
          </h1>
          <ProductCarousel products={recommendedProducts} loading={loading} />
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
