/* eslint-disable @typescript-eslint/no-explicit-any */
import { ReactNode } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { paths } from "../../../path/path";
interface IPublicRouteProps {
  children: ReactNode;
}

const PublicRoute = ({ children }: IPublicRouteProps) => {
  const user = useSelector(
    (state: any) => state?.auth?.user
  );

  console.log("user:",user)

  if (!user) {
    return children;
  }

  return (
    <Navigate
      to={paths.HOME}
      state={{ expired: true }}
    />
  );
};

export default PublicRoute;