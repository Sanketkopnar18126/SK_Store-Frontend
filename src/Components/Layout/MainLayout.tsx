import { Footer } from "../Ui/Footer/Footer";
import { Navbar } from "../Ui/Navbar/Navbar";
import { Outlet } from "react-router-dom";

export const MainLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
     {/* <main className="flex-1"> */}
        <Outlet />
      {/* </main> */}
      <Footer />
    </div>
  );
};

export default MainLayout;
