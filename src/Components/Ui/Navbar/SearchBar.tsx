import React from "react";
import { HiOutlineSearch } from "react-icons/hi";

type Props = {
  value?: string;
  onChange?: (v: string) => void;
  placeholder?: string;
};

export const SearchBar: React.FC<Props> = ({ value = "", onChange, placeholder = "Search products..." }) => {
  return (
    <div className="relative min-w-0"> 
      <input
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        type="search"
        placeholder={placeholder}
        className="
          pl-11 pr-4 py-2 rounded-full
          bg-white/20 backdrop-blur-sm text-white placeholder-white/70
          border border-white/10
          focus:outline-none focus:ring-2 focus:ring-yellow-300 focus:border-yellow-300
          w-full max-w-[220px] sm:max-w-[260px] transition-all duration-200
          hover:bg-white/25
        "
        aria-label="Search products"
      />
      <div className="absolute left-3 top-1/2 -translate-y-1/2 text-white/90 pointer-events-none">
        <HiOutlineSearch size={18} />
      </div>
    </div>
  );
};
