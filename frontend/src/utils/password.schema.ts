import * as yup from 'yup';

export const passwordSchema = yup
  .string()
  .required('enter password')
  .min(7, 'password must be length more than 8')
  .max(64, 'password must be length less than 64')
  .matches(/[A-Z]/, 'password must include at least one lowercase character')
  .matches(/[a-z]/, 'password must include at least one lowercase character')
  .matches(/[-_]/, 'password must have at least one of these chars (- or _)')
  .matches(/\d/, 'password must have at least one digit character');
