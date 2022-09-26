// import Footer from "../components/LandingPage/Footer";
import NavBar from "../components/HomePage/Navbar";
import Sidebar from "../components/HomePage/Sidebar";
import { Outlet, Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const HomePageLayout = () => {
  const authLogin = useSelector((state) => state.auth);
  const location = useLocation();

  return Object.keys(authLogin).length !== 0 ? (
    <div>
      <NavBar />
      <Sidebar />
      <Outlet />
      {/* <div>
        <Footer />
      </div> */}
    </div>
  ) : (
    <Navigate to="/login" replace state={{ from: location }} />
  );
};

export default HomePageLayout;
