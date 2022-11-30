import { Outlet, Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import React from "react";

export default function ({ role }) {
  const isLoggedIn = useSelector((state) => state.auth);
  console.log("🚀 ~ file: protectedRoute.js ~ line 7 ~ isLoggedIn", isLoggedIn);
  const userRole = useSelector((state) => state.auth.role);
  console.log("🚀 ~ file: protectedRoute.js ~ line 8 ~ userRole", userRole);

  if (isLoggedIn && role === userRole) {
    return <Outlet />;
  }
  if (isLoggedIn && role !== userRole) {
    if (userRole === "admin") {
      return <Navigate to="/admin" />;
    }
    if (userRole === "doctor") {
      return <Navigate to="/doctor" />;
    }
    if (userRole === "receptionist") {
      return <Navigate to="/receptionist" />;
    }
    if (userRole === "user") {
      return <Navigate to="/home" />;
    }
  }
  return <Navigate to="/login" />;
}
