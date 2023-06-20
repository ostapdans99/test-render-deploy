import axios from "axios";

export const handleResponseError = (error: unknown) => {
  if (axios.isAxiosError(error)) {
    return error.response ? error.response?.data.message : error.message;
  }

  if (error instanceof Error) {
    return error.message;
  }
};
