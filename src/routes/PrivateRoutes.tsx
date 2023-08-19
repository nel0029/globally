/** @format */

import { Navigate, Route, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoutes = () => {
  const isLogIn = useSelector((state: any) => state.user.isLogIn);

  return isLogIn ? <Outlet /> : <Navigate to="/login" />;
};
export default PrivateRoutes;
