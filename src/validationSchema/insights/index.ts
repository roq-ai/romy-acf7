import * as yup from 'yup';

export const insightValidationSchema = yup.object().shape({
  content: yup.string().required(),
  quote_id: yup.string().nullable().required(),
});
