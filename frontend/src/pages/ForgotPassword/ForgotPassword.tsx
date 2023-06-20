import { FC } from "react";

import { IPagesProps } from "types/pages";
import { FormLayout } from "components/FormLayout";
import { Input } from "components/Input";
import { Button } from "components/Button";

import { IForgotPasswordValues } from "./types";

const ForgotPassword: FC<IPagesProps<IForgotPasswordValues>> = ({
  formik,
  isLoading,
}) => {
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

      <Button type="submit" disabled={isLoading} isLoading={isLoading}>
        Send Email
      </Button>
    </FormLayout>
  );
};

export default ForgotPassword;
