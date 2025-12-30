import React from "react";
import { Link } from "react-router-dom";

export const MobileMenu: React.FC<{ onClose?: () => void }> = ({ onClose }) => {
  const itemClass =
    "block px-4 py-4 text-white text-base font-medium hover:bg-white/10";

  return (
    <div className="md:hidden bg-indigo-700 shadow-lg">
      <nav className="flex flex-col">
        <Link to="/" onClick={onClose} className={itemClass}>
          Home
        </Link>

        <Link to="/" onClick={onClose} className={itemClass}>
          Shop
        </Link>

        <Link to="/" onClick={onClose} className={itemClass}>
          Collections
        </Link>

        <Link to="/" onClick={onClose} className={itemClass}>
          About
        </Link>

        <Link to="/" onClick={onClose} className={itemClass}>
          Account
        </Link>
      </nav>

      {/* Cart Button */}
      <div className="p-4">
        <Link
          to="/cart"
          onClick={onClose}
          className="block text-center bg-yellow-400 text-gray-900 py-3 rounded-md font-semibold hover:bg-yellow-300 transition"
        >
          View Cart
        </Link>
      </div>

      <div className="px-4 py-3 text-xs text-white/70 text-center">
        © {new Date().getFullYear()} Sai Jweller's Shop
      </div>
    </div>
  );
};
