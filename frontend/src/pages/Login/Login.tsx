import { FC } from "react";
import { Link } from "react-router-dom";

import { IPagesProps } from "types/pages";
import { FormLayout } from "components/FormLayout";
import { Input } from "components/Input";
import { Button } from "components/Button";
import { ROUTES } from "common/constants";

import { ILoginValues } from "./types";
import { Links } from "./styles";

const Login: FC<IPagesProps<ILoginValues>> = ({ formik, isLoading }) => {
  const { errors, touched, handleSubmit, getFieldProps } = formik;

  return (
    <FormLayout onSubmit={handleSubmit}>
      <Input
        type="email"
        placeholder="Email"
        touched={touched.email}
        errorMessage={errors.email}
        disabled={isLoading}
        {...getFieldProps("email")}
      />

      <Input
        type="password"
        placeholder="Password"
        touched={touched.password}
        errorMessage={errors.password}
        autoComplete="on"
        disabled={isLoading}
        {...getFieldProps("password")}
      />

      <Button type="submit" disabled={isLoading} isLoading={isLoading}>
        Sign In
      </Button>

      <Links>
        <p>
          Don't you have an account?{" "}
          <Link to={ROUTES.REGISTER}>Click here!</Link>
        </p>
        <p>
          Forgot your password?{" "}
          <Link to={ROUTES.FORGOT_PASSWORD}>Click here!</Link>
        </p>
      </Links>
    </FormLayout>
  );
};

export default Login;
