import { useFormik } from 'formik';
import { useParams } from 'react-router-dom';

import { useChangePassword } from 'api/auth';

import ChangePassword from './ChangePassword';
import { validationSchema } from './validation';
import { INITIAL_VALUES } from './constants';

const ChangePasswordContainer = () => {
  const { token } = useParams();

  const { isLoading: isChangePasswordLoading, mutate: changePasswordMutate } = useChangePassword();

  const formik = useFormik({
    initialValues: INITIAL_VALUES,
    validationSchema,
    validateOnBlur: true,
    onSubmit: ({ password }, { resetForm }) => {
      changePasswordMutate({ password, token });
      resetForm({ values: INITIAL_VALUES });
    },
  });

  return <ChangePassword formik={formik} isLoading={isChangePasswordLoading} />;
};

export default ChangePasswordContainer;
