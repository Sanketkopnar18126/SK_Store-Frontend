import {  Route, Routes } from "react-router-dom"
import MainLayout from "./Components/Layout/MainLayout";
import Home from "./Pages/Home/Home";

export const App=()=> {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        {/* <Route path="/shop" element={<Shop />} /> */}
      </Route>
    </Routes>
  )
}

export default App
