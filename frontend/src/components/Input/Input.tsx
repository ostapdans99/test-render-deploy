import { FC } from "react";

import { IInputProps } from "./types";
import { CustomInput } from "./styles";
import { FieldError } from "./components";

const Input: FC<IInputProps> = ({ touched, errorMessage, ...restProps }) => (
  <>
    <CustomInput {...restProps} />
    {touched && errorMessage && <FieldError>{errorMessage}</FieldError>}
  </>
);

export default Input;
