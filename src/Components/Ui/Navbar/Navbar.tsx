import  { useState } from "react";
import { Link } from "react-router-dom";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";
import { NavbarLinks } from "./NavbarLinks";
import { MobileMenu } from "./MobileMenu";
import { SearchBar } from "./SearchBar";

export const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <Link to="/" className="text-2xl font-extrabold tracking-tight text-indigo-600">
            Sangita's Shop
          </Link>

          {/* Desktop links + search */}
          <div className="flex items-center gap-4">
            <NavbarLinks />
            <SearchBar />
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <HiOutlineX size={28} /> : <HiOutlineMenu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && <MobileMenu />}
    </nav>
  );
};
