import { Link } from "react-router-dom";
import { FaFacebookF, FaInstagram, FaTwitter, FaGithub } from "react-icons/fa";

export const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-10 mt-10">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 border-b border-gray-700 pb-8">
          
          {/* Brand Section */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-3">Aurora Shop</h2>
            <p className="text-sm text-gray-400 leading-relaxed">
              Your one-stop shop for fashion, lifestyle, and essentials.
              Discover your style with us.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-3">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/shop" className="hover:text-indigo-400 transition">Shop</Link></li>
              <li><Link to="/collections" className="hover:text-indigo-400 transition">Collections</Link></li>
              <li><Link to="/about" className="hover:text-indigo-400 transition">About Us</Link></li>
              <li><Link to="/contact" className="hover:text-indigo-400 transition">Contact</Link></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-3">Customer Service</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/faq" className="hover:text-indigo-400 transition">FAQs</Link></li>
              <li><Link to="/returns" className="hover:text-indigo-400 transition">Returns</Link></li>
              <li><Link to="/shipping" className="hover:text-indigo-400 transition">Shipping Info</Link></li>
              <li><Link to="/privacy" className="hover:text-indigo-400 transition">Privacy Policy</Link></li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-3">Follow Us</h3>
            <div className="flex gap-4 text-xl">
              <a href="https://facebook.com" target="_blank" className="hover:text-indigo-400 transition"><FaFacebookF /></a>
              <a href="https://instagram.com" target="_blank" className="hover:text-indigo-400 transition"><FaInstagram /></a>
              <a href="https://twitter.com" target="_blank" className="hover:text-indigo-400 transition"><FaTwitter /></a>
              <a href="https://github.com" target="_blank" className="hover:text-indigo-400 transition"><FaGithub /></a>
            </div>
          </div>

        </div>

        {/* Bottom Footer */}
        <div className="flex flex-col sm:flex-row justify-between items-center text-sm text-gray-500 mt-6">
          <p>© {new Date().getFullYear()} Aurora Shop. All rights reserved.</p>
          <p className="mt-2 sm:mt-0">Made with ❤️ by <span className="text-indigo-400">Your Team</span></p>
        </div>
      </div>
    </footer>
  );
};
