import { useFormik } from 'formik';

import { useForgotPassword } from 'api/auth';

import ForgotPassword from './ForgotPassword';
import { validationSchema } from './validation';
import { INITIAL_VALUES } from './constants';

const ForgotPasswordContainer = () => {
  const { isLoading: isForgotPasswordLoading, mutate: forgotPasswordMutate } = useForgotPassword();

  const formik = useFormik({
    initialValues: INITIAL_VALUES,
    validationSchema,
    validateOnBlur: true,
    onSubmit: (values, { resetForm }) => {
      forgotPasswordMutate(values);
      resetForm({ values: INITIAL_VALUES });
    },
  });

  return <ForgotPassword formik={formik} isLoading={isForgotPasswordLoading} />;
};

export default ForgotPasswordContainer;
