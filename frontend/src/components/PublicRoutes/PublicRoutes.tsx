import { FC } from "react";
import { Navigate, Outlet } from "react-router-dom";

import { ROUTES } from "common/constants";
import { Loader } from "components/Loaders/Loader";

import { IPublicRoutesProps } from "./types";

const PublicRoutes: FC<IPublicRoutesProps> = ({ status }) => {
  if (status === "success") return <Navigate to={ROUTES.HOME} />;

  return status === "loading" ? <Loader /> : <Outlet />;
};

export default PublicRoutes;
