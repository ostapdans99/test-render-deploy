import { FormHTMLAttributes, ReactNode } from "react";

export interface IFormLayoutProps extends FormHTMLAttributes<HTMLFormElement> {
  children: ReactNode;
}
