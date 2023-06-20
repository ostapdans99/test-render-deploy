import { object, string } from "yup";

import { ERRORS } from "common/errors";

export const validationSchema = object().shape({
    email: string().required(ERRORS.REQUIRED).email(ERRORS.EMAIL),
    password: string().required(ERRORS.REQUIRED).min(8, ERRORS.PASSWORD),
  })