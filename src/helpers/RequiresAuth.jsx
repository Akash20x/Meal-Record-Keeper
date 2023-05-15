import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const RequiresAuth = () => {
  return localStorage.getItem("token") ? (
      <Outlet />
  ) : (
    <Navigate to="/login" replace={true} />
  );
};

export default RequiresAuth;