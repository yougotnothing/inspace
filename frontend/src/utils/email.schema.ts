import * as yup from 'yup';

export const emailSchema = yup.string().email('email is invalid');
