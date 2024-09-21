import React from "react";

// react router
import { Outlet, Navigate } from "react-router-dom";

// utils
import { getToken } from "../token";

export default function PrivateRoutes() {
  const auth = getToken();
  return auth.access_token ? <Outlet /> : <Navigate to="/" />;
}
