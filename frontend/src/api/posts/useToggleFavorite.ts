import {
  UseMutationResult,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import { TAxiosRequestError } from "types/error";
import { IPostResponse } from "types/post";
import { generateNotification } from "utils/generateNotification";
import { transformRoute } from "utils/routing";

import { IToggleFavoriteArgs } from "./types";
import { POST } from "./constants";
import { QUERY_KEYS } from "../constants";
import { handleResponseError } from "../utils";
import { instance } from "../base";

export const useToggleFavorite = (): UseMutationResult<
  IPostResponse,
  TAxiosRequestError,
  IToggleFavoriteArgs
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
    async (payload: IToggleFavoriteArgs) => {
      const { postId } = payload;
      const { data: newPost } = await instance.patch(
        transformRoute(POST.TOGGLE_FAVORITE, postId)
      );

      return newPost;
    },
    {
      onSuccess: handleSuccessResponse,
      onError: handleErrorResponse,
    }
  );
};
