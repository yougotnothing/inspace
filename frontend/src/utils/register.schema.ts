import * as yup from 'yup';
import { nameSchema } from './name.schema';
import { emailSchema } from './email.schema';
import { passwordSchema } from './password.schema';

export const registerSchema = yup.object().shape({
  name: nameSchema,
  email: emailSchema,
  password: passwordSchema,
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], "passwords don't match"),
});
