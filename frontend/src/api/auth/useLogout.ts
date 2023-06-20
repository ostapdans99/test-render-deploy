import {
  UseMutationResult,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import { TAxiosRequestError } from "types/error";
import { generateNotification } from "utils/generateNotification";

import { AUTH } from "./constants";
import { handleResponseError } from "../utils";

import { QUERY_KEYS } from "../constants";
import { instance } from "../base";

export const useLogout = (): UseMutationResult<boolean, TAxiosRequestError> => {
  const queryClient = useQueryClient();

  const handleSuccessResponse = () =>
    queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.USER_PROFILE] });

  const handleErrorResponse = (error: TAxiosRequestError) => {
    const message = handleResponseError(error);

    generateNotification({ type: "error", content: message });
  };

  return useMutation(
    async () => {
      const { data } = await instance.delete(AUTH.LOGOUT);

      return data;
    },
    {
      onSuccess: handleSuccessResponse,
      onError: handleErrorResponse,
    }
  );
};
