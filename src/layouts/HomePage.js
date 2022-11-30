// import Footer from "../components/LandingPage/Footer";
import NavBar from "../components/HomePage/Navbar";
import Sidebar from "../components/HomePage/Sidebar";
import { Outlet, Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const HomePageLayout = () => {
  const authLogin = useSelector((state) => state.auth);
  // const userRole = useSelector((state) => state.auth.role);
  const location = useLocation();

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

// Object.keys(authLogin).includes("id") && { userRole: "user" } ? : (
// <Navigate to="/login" replace state={{ from: location }} />
// );

export default HomePageLayout;
