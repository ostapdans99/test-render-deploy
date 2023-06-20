import { useFormik } from 'formik';

import Register from './Register';
import { validationSchema } from './validation';
import { INITIAL_VALUES } from './constants';
import { useRegister } from 'api/auth';

const RegisterContainer = () => {
  const { isLoading: isRegisterLoading, mutate: registerMutate } = useRegister();

  const formik = useFormik({
    initialValues: INITIAL_VALUES,
    validationSchema,
    validateOnBlur: true,
    onSubmit: (values, { resetForm }) => {
      registerMutate(values);
      resetForm({ values: INITIAL_VALUES });
    },
  });

  return <Register formik={formik} isLoading={isRegisterLoading} />;
};

export default RegisterContainer;
