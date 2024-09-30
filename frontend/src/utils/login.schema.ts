import * as yup from 'yup';
import { passwordSchema } from 'utils/password.schema';
import { emailSchema } from 'utils/email.schema';
import { nameSchema } from 'utils/name.schema';

export const loginSchema = yup.object().shape({
  login: yup
    .string()
    .required('login is required')
    .test('is-login-valid', 'login is invalid', value =>
      value.includes('@')
        ? emailSchema.isValidSync(value)
        : nameSchema.isValidSync(value)
    ),
  password: passwordSchema,
});
