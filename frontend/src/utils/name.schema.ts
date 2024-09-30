import * as yup from 'yup';

export const nameSchema = yup
  .string()
  .min(3, 'name length must be more than 3')
  .max(32, 'name must be less than 32');
