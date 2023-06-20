import {
  UseInfiniteQueryResult,
  useInfiniteQuery,
} from "@tanstack/react-query";

import { IPostResponse } from "types/post";
import { TAxiosRequestError } from "types/error";

import { POST } from "./constants";
import { instance } from "../base";
import { QUERY_KEYS } from "../constants";

export const useGetPosts = (
  userId?: string
): UseInfiniteQueryResult<IPostResponse[], TAxiosRequestError> =>
  useInfiniteQuery(
    [QUERY_KEYS.POSTS],
    async ({ pageParam = 1 }) => {
      const postsResponse = await instance.get(POST.POSTS, {
        params: { page: pageParam, userId },
      });

      return postsResponse.data.posts;
    },

    {
      retry: false,
      refetchOnWindowFocus: false,
      getNextPageParam: (currentPage, allPages) =>
        !currentPage.length ? undefined : allPages.length + 1,
    }
  );
