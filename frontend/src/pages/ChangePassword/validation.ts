import { object, string } from "yup";

import { ERRORS } from "common/errors";

export const validationSchema = object().shape({
  password: string().required(ERRORS.REQUIRED).min(8, ERRORS.PASSWORD),
});
