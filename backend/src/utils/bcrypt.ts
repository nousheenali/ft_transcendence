import * as bcrypt from 'bcrypt';

export const hashPassword = (rawPassword: string) => {
  const SALT_ROUNDS = bcrypt.genSaltSync();
  return bcrypt.hashSync(rawPassword, SALT_ROUNDS);
};

export const comparePassword = (rawPassword: string, hashPassword: string) => {
  return bcrypt.compareSync(rawPassword, hashPassword);
};
