import { FormikProps } from 'formik';

export interface IPagesProps<T> {
  formik: FormikProps<T>,
  isLoading: boolean;
}
