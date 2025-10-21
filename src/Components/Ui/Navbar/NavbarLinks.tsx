import React from "react";
import { Link } from "react-router-dom";
import { HiOutlineShoppingCart } from "react-icons/hi";

type Props = { cartCount?: number };

export const NavbarLinks: React.FC<Props> = ({ cartCount = 0 }) => {
  const links = [
    { name: "Home", path: "/" },
    { name: "Collections", path: "/collections" },
    { name: "About", path: "/about" },
    { name: "Account", path: "/account" },
  ];

  return (
    <div className="hidden md:flex items-center gap-6">
      {links.map((link) => (
        <Link key={link.name} to={link.path} className="relative group text-gray-800 font-medium px-1 py-1">
          <span className="relative transition-all duration-200 group-hover:text-indigo-600">
            {link.name}
          </span>
          <span className="absolute left-0 -bottom-0.5 h-0.5 w-0 bg-indigo-600 transition-all duration-300 group-hover:w-full rounded"></span>
        </Link>
      ))}
      <Link
        to="/cart"
        className="relative flex items-center gap-2 bg-yellow-400 text-gray-900 px-4 py-2 rounded-full font-semibold hover:bg-yellow-300 transition shadow-md transform hover:-translate-y-0.5"
        aria-label="View cart"
      >
        <HiOutlineShoppingCart size={18} />
        <span className="whitespace-nowrap">Cart</span>

        {cartCount > 0 && (
          <span className="absolute -top-2 -right-3 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-bold leading-none text-white bg-red-500 rounded-full shadow animate-pulse">
            {cartCount}
          </span>
        )}
      </Link>
    </div>
  );
};
