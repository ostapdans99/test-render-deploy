import { FC } from "react";

import { IPagesProps } from "types/pages";

import { FormLayout } from "components/FormLayout";
import { Input } from "components/Input";
import { Button } from "components/Button";

import { IChangePasswordValues } from "./types";

const ChangePassword: FC<IPagesProps<IChangePasswordValues>> = ({
  formik,
  isLoading,
}) => {
  const { errors, touched, handleSubmit, getFieldProps } = formik;

  return (
    <FormLayout onSubmit={handleSubmit}>
      <Input
        type="password"
        placeholder="Password"
        touched={touched.password}
        errorMessage={errors.password}
        disabled={isLoading}
        {...getFieldProps("password")}
      />

      <Button type="submit" disabled={isLoading} isLoading={isLoading}>
        Change Password
      </Button>
    </FormLayout>
  );
};

export default ChangePassword;
