import React from "react";
import { Link, useLocation } from "react-router-dom";
import type { Category } from "../../Data/Categories";
import { categories as defaultCategories } from "../../Data/Categories";

type Props = {
  categories?: Category[];
  className?: string;
};

export const CategoriesBar: React.FC<Props> = ({
  categories = defaultCategories,
  className = "",
}) => {
  const location = useLocation();

  // get active category slug from URL
  const activeSlug = (() => {
    const match = location.pathname.match(/^\/category\/([^/]+)/);
    return match ? match[1] : null;
  })();

  return (
    <div
      className={`w-full bg-gradient-to-r from-pink-50 via-rose-100 to-yellow-50 shadow-sm border-t border-pink-100 ${className}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative py-3">
          {/* left/right fades only on md+ */}
          <div className="pointer-events-none hidden md:block absolute left-0 top-0 h-full w-10 bg-gradient-to-r from-pink-50 to-transparent" />
          <div className="pointer-events-none hidden md:block absolute right-0 top-0 h-full w-10 bg-gradient-to-l from-pink-50 to-transparent" />

          <div
            className={`
              flex gap-3 items-center py-1 px-2
              flex-wrap md:flex-nowrap
              overflow-visible md:overflow-x-auto
            `}
          >
            {/* 'All' pill */}
            <Link
              to="/shop"
              className={`shrink-0 whitespace-nowrap px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300
                ${!activeSlug ? "bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-md scale-105" : "bg-white text-gray-800 hover:bg-rose-100"}
              `}
              aria-current={!activeSlug ? "true" : undefined}
            >
              All
            </Link>

            {categories.map((c) => {
              const active = activeSlug === c.slug;
              return (
                <Link
                  key={c.id}
                  to={`/category/${c.slug}`}
                  className={`shrink-0 whitespace-nowrap px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300
                    ${active ? "bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-md scale-105" : "bg-white text-gray-800 hover:bg-pink-100"}
                  `}
                  aria-current={active ? "true" : undefined}
                >
                  {c.name}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoriesBar;
