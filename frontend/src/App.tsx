import { Navigate, Route, Routes } from "react-router-dom";

import { PrivateRoutes } from "components/PrivateRoutes";
import { PublicRoutes } from "components/PublicRoutes";
import {
  ChangePassword,
  Favorites,
  ForgotPassword,
  Login,
  Posts,
  Profile,
  Register,
  Error,
} from "pages";
import { useGetUserProfile } from "api/auth";
import { ROUTES } from "common/constants";

const App = () => {
  const { status } = useGetUserProfile();

  return (
    <Routes>
      <Route element={<PublicRoutes status={status} />}>
        <Route path={ROUTES.REGISTER} element={<Register />} />
        <Route path={ROUTES.LOGIN} element={<Login />} />
        <Route path={ROUTES.FORGOT_PASSWORD} element={<ForgotPassword />} />
        <Route path={ROUTES.CHANGE_PASSWORD} element={<ChangePassword />} />
      </Route>
      <Route element={<PrivateRoutes status={status} />}>
        <Route path={ROUTES.HOME} element={<Navigate to={ROUTES.PROFILE} />} />
        <Route path={ROUTES.PROFILE} element={<Profile />} />
        <Route path={ROUTES.POSTS} element={<Posts />} />
        <Route path={ROUTES.FAVORITES} element={<Favorites />} />
      </Route>
      <Route path={ROUTES.NOTFOUND} element={<Error />} />
      <Route
        path={ROUTES.UNREGISTERED}
        element={<Navigate to={ROUTES.NOTFOUND} />}
      />
    </Routes>
  );
};

export default App;
