import { object, string } from "yup";

import { ERRORS } from "common/errors";

export const validationSchema = object().shape({
  email: string().required(ERRORS.REQUIRED).email(ERRORS.EMAIL),
});
