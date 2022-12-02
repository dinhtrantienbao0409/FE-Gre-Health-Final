import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import React from "react";

export default function ProtectedRoute({ role }) {
  const isLoggedIn = useSelector((state) => state.auth);
  console.log("🚀 ~ file: protectedRoute.js ~ line 7 ~ isLoggedIn", isLoggedIn);
  const userRole = useSelector((state) => state.auth.role);
  console.log("🚀 ~ file: protectedRoute.js ~ line 8 ~ userRole", userRole);

  if (isLoggedIn && role === userRole) {
    return <Outlet />;
  }
  if (isLoggedIn && role !== userRole) {
    if (userRole === "admin") {
      return <Navigate to="/admin/view" />;
    }
    if (userRole === "doctor") {
      return <Navigate to="/doctor/view" />;
    }
    if (userRole === "receptionist") {
      return <Navigate to="/receptionist/view" />;
    }
    if (userRole === "user") {
      return <Navigate to="/home/view" />;
    }
  }
  return <Navigate to="/login" />;
}
