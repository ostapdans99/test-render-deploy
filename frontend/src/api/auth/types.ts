import { IUserResponse } from "types/user";

export interface IRegisterArgs {
  username: string;
  email: string;
  password: string;
}

export interface ILoginArgs extends Omit<IRegisterArgs, "username"> {}

export interface IForgotPasswordArgs extends Pick<ILoginArgs, "email"> {}

export interface IChangePasswordArgs extends Pick<ILoginArgs, "password"> {
  token?: string;
}

interface ITokensResponse {
  accessToken: string;
  refreshToken: string;
}

export interface IAuthResponse {
  user: IUserResponse;
  tokens: ITokensResponse;
}
