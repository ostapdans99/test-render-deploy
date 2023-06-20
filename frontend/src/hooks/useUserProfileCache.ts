import { useQueryClient } from "@tanstack/react-query";

import { IUserResponse } from "types/user";
import { QUERY_KEYS } from "api/constants";

export const useUserProfileCache = () => {
  const queryClient = useQueryClient();
  const userProfile = queryClient.getQueryData<IUserResponse>([
    QUERY_KEYS.USER_PROFILE,
  ]);

  return userProfile;
};
