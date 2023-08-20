/** @format */

import { Navigate, Route, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoutes = () => {
  const isLogIn = localStorage.getItem("isLogIn");
  console.log(isLogIn);

  return isLogIn ? <Outlet /> : <Navigate to="/login" />;
};
export default PrivateRoutes;
