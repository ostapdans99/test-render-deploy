import { FC } from "react";

import { IFieldErrorProps } from "./types";
import { Error } from "./styles";

const FieldError: FC<IFieldErrorProps> = ({ children }) => (
  <Error>{children}</Error>
);

export default FieldError;
