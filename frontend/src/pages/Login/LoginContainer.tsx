import { useFormik } from 'formik';

import { useLogin } from 'api/auth';

import Login from './Login';
import { validationSchema } from './validation';
import { INITIAL_VALUES } from './constants';

export const LoginContainer = () => {
  const { isLoading: isLoginLoading, mutate: loginMutate } = useLogin();

  const formik = useFormik({
    initialValues: INITIAL_VALUES,
    validationSchema,
    validateOnBlur: true,
    onSubmit: (values, { resetForm }) => {
      loginMutate(values);
      resetForm({ values: INITIAL_VALUES });
    },
  });

  return <Login formik={formik} isLoading={isLoginLoading} />;
};

export default LoginContainer;
