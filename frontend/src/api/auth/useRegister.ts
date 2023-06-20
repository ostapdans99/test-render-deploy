import { UseMutationResult, useMutation } from "@tanstack/react-query";

import { TAxiosRequestError } from "types/error";
import { generateNotification } from "utils/generateNotification";

import { AUTH } from "./constants";
import { IRegisterArgs } from "./types";
import { handleResponseError } from "../utils";
import { instance } from "../base";

export const useRegister = (): UseMutationResult<
  string,
  TAxiosRequestError,
  IRegisterArgs
> => {
  const handleSuccessResponse = (data: string) => {
    generateNotification({ type: "success", content: data });
  };

  const handleErrorResponse = (error: TAxiosRequestError) => {
    const message = handleResponseError(error);

    generateNotification({ type: "error", content: message });
  };

  return useMutation(
    async (payload: IRegisterArgs) => {
      const { data: message } = await instance.post(AUTH.REGISTER, payload);

      return message;
    },
    {
      onSuccess: handleSuccessResponse,
      onError: handleErrorResponse,
    }
  );
};
