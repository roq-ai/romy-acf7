import * as yup from 'yup';

export const subscriberValidationSchema = yup.object().shape({
  subscription_date: yup.date().required(),
  expiration_date: yup.date().nullable(),
  status: yup.string().required(),
  user_id: yup.string().nullable().required(),
});
