import {
  UseMutationResult,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import { IPostResponse } from "types/post";
import { TAxiosRequestError } from "types/error";
import { generateNotification } from "utils/generateNotification";

import { ICreatePostArgs } from "./types";
import { POST } from "./constants";
import { QUERY_KEYS } from "../constants";
import { handleResponseError } from "../utils";
import { instance } from "../base";

export const useCreatePost = (): UseMutationResult<
  IPostResponse,
  TAxiosRequestError,
  ICreatePostArgs
> => {
  const queryClient = useQueryClient();

  const handleSuccessResponse = () => {
    return queryClient.invalidateQueries({
      queryKey: [QUERY_KEYS.POSTS],
    });
  };

  const handleErrorResponse = (error: TAxiosRequestError) => {
    const message = handleResponseError(error);

    generateNotification({ type: "error", content: message });
  };

  return useMutation(
    async (payload: ICreatePostArgs) => {
      const { data: newPost } = await instance.post(POST.POSTS, payload);

      return newPost;
    },
    {
      onSuccess: handleSuccessResponse,
      onError: handleErrorResponse,
    }
  );
};
