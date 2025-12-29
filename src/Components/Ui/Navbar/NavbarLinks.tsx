import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { HiOutlineShoppingCart } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../../Store";
import { hydrateAuthState } from "../../../Store/Slices/AuthSlice";
import {
  FiUser,
  FiPackage,
  FiLogOut,
  FiChevronDown,
} from "react-icons/fi";
type Props = { cartCount?: number };

export const NavbarLinks: React.FC<Props> = ({ cartCount = 0 }) => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector(
    (state: RootState) => state.auth
  );

  console.log("Is", isAuthenticated, user);
  const links = [
    { name: "Home", path: "/" },
    { name: "Collections", path: "/collections" },
    { name: "Account", path: "/account" },
    { name: "Admin", path: "/admin/products" },
  ];
  useEffect(() => {
    dispatch(hydrateAuthState());
  }, [dispatch]);

  return (
    <div className="hidden md:flex items-center gap-6">
      {/* Nav Links */}
      {links.map((link) => (
        <Link
          key={link.name}
          to={link.path}
          className="relative group text-gray-800 font-medium px-1 py-1"
        >
          <span className="group-hover:text-indigo-600">{link.name}</span>
          <span className="absolute left-0 -bottom-0.5 h-0.5 w-0 bg-indigo-600 transition-all duration-300 group-hover:w-full rounded" />
        </Link>
      ))}

      {/* Cart */}
      <Link
        to="/cart"
        className="relative flex items-center gap-2 bg-yellow-400 text-gray-900 px-4 py-2 rounded-full font-semibold hover:bg-yellow-300 transition shadow-md"
      >
        <HiOutlineShoppingCart size={18} />
        Cart
        {cartCount > 0 && (
          <span className="absolute -top-2 -right-3 px-1.5 py-0.5 text-xs font-bold text-white bg-red-500 rounded-full animate-pulse">
            {cartCount}
          </span>
        )}
      </Link>

      {/* Auth Section */}
      {!isAuthenticated ? (
        <Link
          to="/login"
          className="px-4 py-2 rounded-full border border-indigo-600 text-indigo-600 font-semibold hover:bg-indigo-600 hover:text-white transition"
        >
          Login
        </Link>
      ) : (
        <div className="relative">
          {/* Profile Button */}
          <button
            onClick={() => setOpen((prev) => !prev)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-gray-200 shadow-sm hover:shadow-md transition"
          >
            <div className="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center text-sm font-semibold">
              {user?.fullName?.charAt(0).toUpperCase()}
            </div>

            <span className="text-gray-800 text-sm font-medium">
              {user?.fullName?.split(" ")[0]}
            </span>

            <FiChevronDown
              size={16}
              className={`text-gray-500 transition-transform ${
                open ? "rotate-180" : ""
              }`}
            />
          </button>

          {/* Square Dropdown */}
          {open && (
            <div className="absolute right-0 mt-3 w-56 rounded-2xl border bg-white shadow-xl p-3 z-50 animate-in fade-in zoom-in-95">
              <div className="grid grid-cols-2 gap-3">
                <Link
                  to="/account"
                  onClick={() => setOpen(false)}
                  className="flex flex-col items-center justify-center gap-2 rounded-xl bg-gray-50 p-4 hover:bg-indigo-50 transition"
                >
                  <FiUser size={20} className="text-indigo-600" />
                  <span className="text-sm font-medium text-gray-700">
                    My Profile
                  </span>
                </Link>

                <Link
                  to=""
                  onClick={() => setOpen(false)}
                  className="flex flex-col items-center justify-center gap-2 rounded-xl bg-gray-50 p-4 hover:bg-indigo-50 transition"
                >
                  <FiPackage size={20} className="text-indigo-600" />
                  <span className="text-sm font-medium text-gray-700">
                    Orders
                  </span>
                </Link>

                <button
                  onClick={() => {
                    setOpen(false);
                    // dispatch(logoutUser(...))
                  }}
                  className="col-span-2 flex items-center justify-center gap-2 rounded-xl bg-red-50 p-4 text-red-600 font-semibold hover:bg-red-100 transition"
                >
                  <FiLogOut size={18} />
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
