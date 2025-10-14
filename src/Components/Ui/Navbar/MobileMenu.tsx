import React from "react";
import { Link } from "react-router-dom";

export const MobileMenu: React.FC<{ onClose?: () => void }> = ({ onClose }) => {

  return (
    <div className="md:hidden bg-gradient-to-b from-indigo-700 via-purple-700 to-pink-600 border-t border-white/20 shadow-lg">
      <nav className="flex flex-col divide-y divide-white/10">
        <Link to="/shop" onClick={onClose} className="px-4 py-4 text-white hover:bg-white/5">Shop</Link>
        <Link to="/collections" onClick={onClose} className="px-4 py-4 text-white hover:bg-white/5">Collections</Link>
        <Link to="/about" onClick={onClose} className="px-4 py-4 text-white hover:bg-white/5">About</Link>
        <Link to="/account" onClick={onClose} className="px-4 py-4 text-white hover:bg-white/5">Account</Link>

        <div className="px-4 py-4">
          <Link
            to="/cart"
            onClick={onClose}
            className="block text-center bg-yellow-400 text-gray-900 px-4 py-2 rounded-md font-semibold hover:bg-yellow-300 transition"
          >
            Cart
          </Link>
        </div>
      </nav>
      <div className="px-4 py-3 text-xs text-white/80">© {new Date().getFullYear()} Aurora Shop</div>
    </div>
  );
};
