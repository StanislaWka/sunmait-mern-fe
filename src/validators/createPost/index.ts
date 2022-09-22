import * as yup from 'yup';

export const validationSchema = yup.object().shape({
  title: yup.string().required('Title is required'),
  text: yup.string().required('Text is required'),
});
