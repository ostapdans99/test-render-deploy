import {
  UseInfiniteQueryResult,
  useInfiniteQuery,
} from "@tanstack/react-query";

import { IPostResponse } from "types/post";
import { TAxiosRequestError } from "types/error";

import { POST } from "./constants";
import { instance } from "../base";
import { QUERY_KEYS } from "../constants";

export const useGetFavoritesPosts = (): UseInfiniteQueryResult<
  IPostResponse[],
  TAxiosRequestError
> =>
  useInfiniteQuery(
    [QUERY_KEYS.POSTS],
    async ({ pageParam = 1 }) =>
      await instance
        .get(POST.FAVORITES_POSTS, { params: { page: pageParam } })
        .then((response) => response.data),

    {
      retry: false,
      refetchOnWindowFocus: false,
      getNextPageParam: (currentPage, allPages) =>
        !currentPage.length ? undefined : allPages.length + 1,
    }
  );
