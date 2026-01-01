import {  Route, Routes } from "react-router-dom"
import MainLayout from "./Components/Layout/MainLayout";
import Home from "./Pages/Home/Home";
import { LoginPage } from "./Components/Auth/Login/LoginPage";
import { LogoutPage } from "./Components/Auth/Logout/LogoutPage";
import { AddProduct } from "./Pages/Admin/AddProduct";
import { AdminProductsTable } from "./Pages/Admin/AdminProductsTable";
import CartPage from "./Pages/Cart/Cart";
import { Register } from "./Components/Auth/Register/Register";
import ProductDetails from "./Pages/Product/ProductDetails";
import CategoryPage from "./Pages/Category/CategoryPage";

export const App=()=> {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/logout" element={<LogoutPage />} />
        <Route path="/admin/products" element={<AdminProductsTable />} />
        <Route path="/admin/add-product" element={<AddProduct />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/category/:slug" element={<CategoryPage />} />

      </Route>
    </Routes>
  )
}

export default App
