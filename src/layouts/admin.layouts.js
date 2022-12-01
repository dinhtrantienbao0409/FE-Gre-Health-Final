import Sidebar from "../components/HomePage/Sidebar";
import { Outlet, Navigate, useLocation } from "react-router-dom";
import AdminNavbar from "components/Navbar/AdminNavbar";

export default function AdminLayout() {
  return (
    <div>
      <AdminNavbar />
      <Sidebar />
      <Outlet />
    </div>
  );
}
