import {
  FetchNextPageOptions,
  InfiniteQueryObserverResult,
} from "@tanstack/react-query";

import { IPostResponse } from "types/post";
import { TAxiosRequestError } from "types/error";

export interface IPostsProps {
  posts?: IPostResponse[][];
  dataLength: number;
  hasNextPage?: boolean;
  fetchNextPage: (
    options?: FetchNextPageOptions | undefined
  ) => Promise<
    InfiniteQueryObserverResult<IPostResponse[], TAxiosRequestError>
  >;
}
