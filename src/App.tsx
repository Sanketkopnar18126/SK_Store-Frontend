import {  Route, Routes } from "react-router-dom"
import MainLayout from "./Components/Layout/MainLayout";
import Home from "./Pages/Home/Home";
import { LoginPage } from "./Components/Auth/Login/LoginPage";
import { LogoutPage } from "./Components/Auth/Logout/LogoutPage";
import { AddProduct } from "./Pages/Admin/AddProduct";
import { AdminProductsTable } from "./Pages/Admin/AdminProductsTable";

export const App=()=> {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/logout" element={<LogoutPage />} />
        <Route path="/admin/products" element={<AdminProductsTable />} />
        <Route path="/admin/add-product" element={<AddProduct />} />
      </Route>
    </Routes>
  )
}

export default App
