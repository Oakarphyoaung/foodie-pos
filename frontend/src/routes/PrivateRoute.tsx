import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AppContext } from "../contexts/AppContext";

const PrivateRoute = () => {
  const accessToken = localStorage.getItem("accessToken");
  return accessToken ? <Outlet /> : <Navigate to={"/login"} />;
};

export default PrivateRoute;
