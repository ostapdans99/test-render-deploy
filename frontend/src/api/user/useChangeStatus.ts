import { UseMutationResult, useMutation, useQueryClient } from "@tanstack/react-query";

import { IUserResponse } from "types/user";
import { TAxiosRequestError } from "types/error";
import { generateNotification } from "utils/generateNotification";

import { IChangeStatusArgs } from "./types";
import { MESSAGES, USER } from "./constants";
import { handleResponseError } from "../utils";
import { QUERY_KEYS } from "../constants";
import { instance } from "../base";

export const useChangeStatus = (): UseMutationResult<
  IUserResponse,
  TAxiosRequestError,
  IChangeStatusArgs
> => {
  const queryClient = useQueryClient();

  const handleSuccessResponse = () => {
    generateNotification({ type: "success", content: MESSAGES.STATUS });

    return queryClient.invalidateQueries({
      queryKey: [QUERY_KEYS.USER_PROFILE],
    });
  };

  const handleErrorResponse = (error: TAxiosRequestError) => {
    const message = handleResponseError(error);

    generateNotification({ type: "error", content: message });
  };

  return useMutation(
    async (payload: IChangeStatusArgs) => {
      const { data: userProfileResponse } = await instance.patch(USER.CHANGE_STATUS, payload);

      return userProfileResponse;
    },
    {
      onSuccess: handleSuccessResponse,
      onError: handleErrorResponse,
    }
  );
};
