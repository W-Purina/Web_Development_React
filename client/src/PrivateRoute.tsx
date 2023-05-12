import { Navigate, useLocation } from "react-router-dom";
import React, { ReactNode } from "react";

interface PrivateRouteProps {
  children: ReactNode;
}

export const PrivateRoute: React.FC<PrivateRouteProps> = ({
  children,
}: {
  children: ReactNode;
}) => {
  const token = localStorage.getItem("token");
  const location = useLocation();

  return token ? (
    children
  ) : (
    <Navigate replace to="/login" state={{ from: location }} />
  );
};
###test2222234444