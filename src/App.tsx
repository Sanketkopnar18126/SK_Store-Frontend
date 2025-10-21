import {  Route, Routes } from "react-router-dom"
import MainLayout from "./Components/Layout/MainLayout";
import Home from "./Pages/Home/Home";
import { LoginPage } from "./Components/Auth/Login/LoginPage";
import { LogoutPage } from "./Components/Auth/Logout/LogoutPage";

export const App=()=> {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/logout" element={<LogoutPage />} />
      </Route>
    </Routes>
  )
}

export default App
