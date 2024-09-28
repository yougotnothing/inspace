import * as yup from 'yup';

const emailSchema = yup.string().email('email is invalid');
const nameSchema = yup
  .string()
  .min(3, 'name length must be more than 3')
  .max(32, 'name must be less than 32');

export const loginSchema = yup.object().shape({
  login: yup
    .string()
    .required('login is required')
    .test('is-login-valid', 'login is invalid', value =>
      value.includes('@')
        ? emailSchema.isValidSync(value)
        : nameSchema.isValidSync(value)
    ),
  password: yup
    .string()
    .required('enter password')
    .min(8, 'password must be length more than 8')
    .max(64, 'password must be length less than 64')
    .matches(/[A-Z]/, 'password must include at least one lowercase character')
    .matches(/[a-z]/, 'password must include at least one lowercase character')
    .matches(/[-_]/, 'password must have at least one of these chars (- or _)'),
});
