import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  // ⏳ jab tak auth check ho raha hai
  if (loading) return <p>Loading...</p>;

  // ❌ agar user nahi hai → login page
  if (!user) return <Navigate to="/login" replace />;

  // ✅ agar user hai → allow access
  return children;
};

export const PublicRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) return <p>Loading...</p>;

  // agar already login hai → redirect home/dashboard
  if (user) return <Navigate to="/" replace />;

  return children;
};
