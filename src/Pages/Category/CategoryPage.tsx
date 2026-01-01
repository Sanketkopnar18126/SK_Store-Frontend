import React, { useEffect, useMemo, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import type { RootState, AppDispatch } from "../../Store";
import { getAllProducts } from "../../Store/Slices/ProductSlice";
import { categories } from "../../Data/Categories";
import ProductCard from "../../Components/CategoryCarousel/ProductCard";
import { X } from "lucide-react";
import FilterPanel from "./FilterPanel";
import ProductCardSkeleton from "../../Components/Ui/Loader/ProductCardSkeleton";

const CategoryPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const { products, loading, error } = useSelector((state: RootState) => state.products);

  const category = useMemo(() => categories.find((cat) => cat.slug === slug), [slug]);

  useEffect(() => {
    if (!Object.keys(products).length) dispatch(getAllProducts());
  }, [dispatch, products]);

  const [priceRange, setPriceRange] = useState<number[]>([0, 1000]);
  const [sortBy, setSortBy] = useState<"lowToHigh" | "highToLow" | "default">("default");
  const [inStockOnly, setInStockOnly] = useState(false);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const filteredProducts = useMemo(() => {
    if (!category) return [];
    let filtered = products[category.backendKey] || [];
    filtered = filtered.filter((p) => p.price >= priceRange[0] && p.price <= priceRange[1]);
    if (inStockOnly) filtered = filtered.filter((p) => p.stock > 0);
    if (sortBy === "lowToHigh") filtered.sort((a, b) => a.price - b.price);
    if (sortBy === "highToLow") filtered.sort((a, b) => b.price - a.price);
    return filtered;
  }, [products, category, priceRange, sortBy, inStockOnly]);

  if (!category) return <p className="text-center mt-10 text-red-500">Category not found.</p>;
  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;

  return (
    <div className="flex flex-col md:flex-row gap-6 p-4 sm:p-6 md:p-8">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-72 bg-white rounded-xl shadow p-4 space-y-6 sticky top-4 h-max">
        <FilterPanel
          priceRange={priceRange}
          setPriceRange={setPriceRange}
          inStockOnly={inStockOnly}
          setInStockOnly={setInStockOnly}
          sortBy={sortBy}
          setSortBy={setSortBy}
        />
      </aside>

      {/* Main Content */}
      <main className="flex-1">
        {/* Mobile Filter Button */}
        <div className="md:hidden flex justify-end mb-4">
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
            onClick={() => setMobileFiltersOpen(true)}
          >
            Filters
          </button>
        </div>

        {/* Slide-over Mobile Filters */}
        {mobileFiltersOpen && (
          <div className="fixed inset-0 z-50 flex">
            <div
              className="fixed inset-0 bg-black opacity-30"
              onClick={() => setMobileFiltersOpen(false)}
            />
            <div className="relative w-80 bg-white h-full shadow-xl p-6 overflow-y-auto">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">Filters</h2>
                <button onClick={() => setMobileFiltersOpen(false)}>
                  <X className="w-6 h-6 text-gray-600" />
                </button>
              </div>
              <FilterPanel
                priceRange={priceRange}
                setPriceRange={setPriceRange}
                inStockOnly={inStockOnly}
                setInStockOnly={setInStockOnly}
                sortBy={sortBy}
                setSortBy={setSortBy}
              />
            </div>
          </div>
        )}

        {/* Category Title */}
        <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-900">
          {category.name}
        </h1>

        {/* Products Grid */}
     {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 auto-rows-fr">
            {Array.from({ length: 8 }).map((_, idx) => (
              <ProductCardSkeleton key={idx} />
            ))}
          </div>
        ) : filteredProducts.length === 0 ? (
          <p className="text-center text-gray-500 mt-10">No products found in this category.</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 auto-rows-fr">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

      </main>
    </div>
  );
};

export default CategoryPage;
