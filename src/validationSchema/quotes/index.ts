import * as yup from 'yup';

export const quoteValidationSchema = yup.object().shape({
  content: yup.string().required(),
  publisher_id: yup.string().nullable().required(),
});
