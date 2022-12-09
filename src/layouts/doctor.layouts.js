import Sidebar from "../components/HomePage/Sidebar";
import { Outlet, Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import DoctorNavbar from "components/Navbar/DoctorNavbar";

export default function DoctorLayout() {
  const authLogin = useSelector((state) => state.auth);
  const userRole = useSelector((state) => state.auth.role);

  const location = useLocation();

  return Object.keys(authLogin).includes("id") ? (
    <div>
      <DoctorNavbar />
      <Sidebar />
      <Outlet />
      {/* <div>
        <Footer />
      </div> */}
    </div>
  ) : (
    <Navigate to="/login" replace state={{ from: location }} />
  );
}
