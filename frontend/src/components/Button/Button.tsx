import { FC } from "react";

import { MiniLoader } from "components/Loaders/MiniLoader";

import { IButtonProps } from "./types";
import { CustomButton } from "./styles";

const Button: FC<IButtonProps> = ({ children, isLoading, ...restProps }) => (
  <CustomButton {...restProps}>
    {isLoading ? <MiniLoader /> : children}
  </CustomButton>
);

export default Button;
