import * as Yup from 'yup';
import { minPasswordLength, maxNameLength, maxSurnameLength } from 'constants/';

const nameSurname = /[A-Za-zА-Яа-я]+$/;

export const validationSchema = Yup.object().shape({
  name: Yup.string()
    .matches(nameSurname, 'Please, fill in correct value')
    .max(maxNameLength, 'First name must be no more than 11 characters')
    .required('First name is required'),
  surname: Yup.string()
    .matches(nameSurname, 'Please, fill in correct value')
    .max(maxSurnameLength, 'First name must be no more than 14 characters')
    .required('Last name is required'),
  email: Yup.string().email('Invalid email format').required('Email is required'),
  password: Yup.string()
    .min(minPasswordLength, 'Password must be at least 8 characters')
    .required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], "Passwords don't match")
    .required('Please confirm your password'),
});
