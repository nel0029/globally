/** @format */

import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoutes = () => {
  const isLogIn = localStorage.getItem("isLogIn");

  return isLogIn ? <Outlet /> : <Navigate to="/login" />;
};
export default PrivateRoutes;
