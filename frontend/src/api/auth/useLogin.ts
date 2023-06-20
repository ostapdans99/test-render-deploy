import {
  UseMutationResult,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import { TAxiosRequestError } from "types/error";
import { generateNotification } from "utils/generateNotification";

import { AUTH } from "./constants";
import { IAuthResponse, ILoginArgs } from "./types";
import { handleResponseError } from "../utils";
import { QUERY_KEYS } from "../constants";
import { instance } from "../base";

export const useLogin = (): UseMutationResult<
  IAuthResponse,
  TAxiosRequestError,
  ILoginArgs
> => {
  const queryClient = useQueryClient();

  const handleSuccessResponse = () =>
    queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.USER_PROFILE] });

  const handleErrorResponse = (error: TAxiosRequestError) => {
    const message = handleResponseError(error);

    generateNotification({ type: "error", content: message });
  };

  return useMutation(
    async (payload: ILoginArgs) => {
      const { data: userProfileResponse } = await instance.post(
        AUTH.LOGIN,
        payload
      );

      return userProfileResponse;
    },
    {
      onSuccess: handleSuccessResponse,
      onError: handleErrorResponse,
    }
  );
};
