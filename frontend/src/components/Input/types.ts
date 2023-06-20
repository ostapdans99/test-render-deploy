import { InputHTMLAttributes } from "react";

export interface IInputProps extends InputHTMLAttributes<HTMLInputElement> {
    touched?: boolean;
    errorMessage?: string; 
}
