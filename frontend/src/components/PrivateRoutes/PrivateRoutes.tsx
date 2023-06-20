import { FC } from "react";
import { Navigate, Outlet } from "react-router-dom";

import { ROUTES } from "common/constants";
import { Loader } from "components/Loaders/Loader";
import { Layout } from "components/Layout";
import { PageWrapper } from "styles/pages";

import { IPrivateRoutesProps } from "./types";

const PrivateRoutes: FC<IPrivateRoutesProps> = ({ status }) => {
  if (status === "error") return <Navigate to={ROUTES.LOGIN} />;

  return status === "loading" ? (
    <Loader />
  ) : (
    <Layout>
      <PageWrapper>
        <Outlet />
      </PageWrapper>
    </Layout>
  );
};

export default PrivateRoutes;
