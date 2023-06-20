import {
  FetchNextPageOptions,
  InfiniteQueryObserverResult,
} from "@tanstack/react-query";
import { FormikProps } from "formik";

import { IPostResponse } from "types/post";
import { TAxiosRequestError } from "types/error";

export interface IProfileProps<T> {
  formik: Pick<FormikProps<T>, "values" | "handleSubmit" | "handleChange">;
  posts?: IPostResponse[][];
  dataLength: number;
  isLoading: boolean;
  hasNextPage?: boolean;
  fetchNextPage: (
    options?: FetchNextPageOptions | undefined
  ) => Promise<
    InfiniteQueryObserverResult<IPostResponse[], TAxiosRequestError>
  >;
}

export interface IAddPostValues {
  content: string;
}
