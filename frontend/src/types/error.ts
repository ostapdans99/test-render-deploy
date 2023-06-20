import { AxiosError } from 'axios';

interface IRequestErrorPayload {
  message: string;
  statusCode: number;
  success: boolean;
}

export type TAxiosRequestError = AxiosError<IRequestErrorPayload>;