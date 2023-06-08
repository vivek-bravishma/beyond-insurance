import React from "react";
import { Navigate, Route } from "react-router-dom";
import secureLocalStorage from "react-secure-storage";

const PrivateRoute = ({
  path,
  component: Component,
  isAuthenticated,
  ...rest
}) => {
  const userPresent = JSON.parse(secureLocalStorage.getItem("user"))
    ? true
    : false;
  console.log(userPresent);
  return userPresent ? <Component /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;
