import {
  UseMutationResult,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import { TAxiosRequestError } from "types/error";
import { IPostResponse } from "types/post";
import { generateNotification } from "utils/generateNotification";
import { transformRoute } from "utils/routing";

import { IDeletePostArgs } from "./types";
import { POST } from "./constants";
import { QUERY_KEYS } from "../constants";
import { handleResponseError } from "../utils";
import { instance } from "../base";

export const useDeletePost = (): UseMutationResult<
  IPostResponse,
  TAxiosRequestError,
  IDeletePostArgs
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
    async (payload: IDeletePostArgs) => {
      const { postId } = payload;
      const { data: newPost } = await instance.delete(
        transformRoute(POST.DELETE_POST, postId)
      );

      return newPost;
    },
    {
      onSuccess: handleSuccessResponse,
      onError: handleErrorResponse,
    }
  );
};
