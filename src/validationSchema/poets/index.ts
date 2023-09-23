import * as yup from 'yup';

export const poetValidationSchema = yup.object().shape({
  name: yup.string().required(),
  birth_date: yup.date().nullable(),
  death_date: yup.date().nullable(),
  nationality: yup.string().nullable(),
});
