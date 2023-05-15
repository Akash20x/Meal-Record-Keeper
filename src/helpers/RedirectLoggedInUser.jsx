import React from "react";
import { Navigate } from "react-router-dom";

const RedirectLoggedInUser = ({ children }) => {
    
  return !(localStorage.getItem("token"))? (
    children
  ) : (
    <Navigate replace={true} to={"/dashboard"} />
  );
};

export default RedirectLoggedInUser;