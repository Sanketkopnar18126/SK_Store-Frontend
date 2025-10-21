import { useState } from "react";
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
        <div className="flex justify-between h-16 items-center gap-4">
          <Link to="/" className="text-2xl font-extrabold tracking-tight text-indigo-600 flex-shrink-0">
            Sangita's Shop
          </Link>
          <div className="hidden md:flex items-center gap-4 min-w-0">
            <NavbarLinks />
            <div className="min-w-0"> 
              <SearchBar />
            </div>
          </div>
          <div className="flex items-center md:hidden gap-3 min-w-0">
            <div className="min-w-0 w-10"> 
              <SearchBar />
            </div>
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} aria-label="Open menu" className="flex-shrink-0">
              {mobileMenuOpen ? <HiOutlineX size={28} /> : <HiOutlineMenu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {mobileMenuOpen && <MobileMenu />}
    </nav>
  );
};
