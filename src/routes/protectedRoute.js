import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import React from "react";

export default function ProtectedRoute({ role }) {
  const isLoggedIn = useSelector((state) => state.auth);
  const userRole = useSelector((state) => state.auth.role);
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
