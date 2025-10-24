import type { ReactNode } from "react";
import { Link } from "react-router-dom";


interface AdminLayoutProps {
  children: ReactNode;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r p-5">
        <h1 className="text-2xl font-bold mb-6">Admin Panel</h1>
        <nav className="flex flex-col space-y-2">
          <Link to="/admin/products" className="p-2 rounded hover:bg-gray-200">
            Products
          </Link>
          <Link to="/admin/users" className="p-2 rounded hover:bg-gray-200">
            Users
          </Link>
          <Link to="/" className="p-2 rounded hover:bg-gray-200">
            Back to Site
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
};
