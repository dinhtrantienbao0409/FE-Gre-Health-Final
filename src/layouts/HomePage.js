// import Footer from "../components/LandingPage/Footer";
import NavBar from "../components/HomePage/Navbar";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/HomePage/Sidebar";

const HomePageLayout = () => {
  return (
    <div>
      <NavBar />
      <Sidebar />
      <Outlet />
      {/* <div>
        <Footer />
      </div> */}
    </div>
  );
};

export default HomePageLayout;
