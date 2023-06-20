import { FC } from "react";

import { Logo } from "assets/vectors";

import { IFormLayoutProps } from "./types";
import { FormWrapper, LogoTitle, LogoWrapper } from "./styles";

const FormLayout: FC<IFormLayoutProps> = ({ children, ...restProps }) => (
  <FormWrapper {...restProps}>
    <LogoWrapper>
      <Logo />
      <LogoTitle>Sweater</LogoTitle>
    </LogoWrapper>
    {children}
  </FormWrapper>
);
export default FormLayout;
