import * as bcrypt from 'bcryptjs';
import { Buffer } from 'buffer';

export const generateGooglePassword = async (
  email: string,
  name: string,
  date: Date | string
) => {
  const password = Buffer.from(`${date}:${email}-${name}`).toString('base64');

  return {
    hashed: await bcrypt.hash(password, 10),
    password,
  };
};
