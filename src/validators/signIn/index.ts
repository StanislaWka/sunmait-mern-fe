import * as yup from 'yup';
import { minPasswordLength } from 'constants/';

export const validationSchema = yup.object().shape({
  email: yup.string().email('Invalid email format').required('Email is required'),
  password: yup
    .string()
    .min(minPasswordLength, 'Password must be at least 8 characters')
    .required('Password is required'),
});
