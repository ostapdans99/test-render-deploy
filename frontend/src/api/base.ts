import axios from "axios";

import { env } from "configurations/env";

import { PATH } from "./constants";

export const instance = axios.create({
  baseURL: env.REACT_APP_API_URL,
  withCredentials: true,
});

instance.interceptors.response.use(
  (config) => config,
  async (error) => {
    const originalRequest = error.config;

    const refreshURL = `${env.REACT_APP_API_URL}${PATH.REFRESH}`;

    if (
      error.response.status === 401 &&
      error.request.responseURL !== refreshURL
    ) {
      await instance.post(PATH.REFRESH);
      return instance.request(originalRequest);
    }
    throw error;
  }
);
