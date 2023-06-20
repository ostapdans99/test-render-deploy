import { cleanEnv, url } from "envalid";

export const env = cleanEnv(process.env, {
  REACT_APP_API_URL: url(),
});
