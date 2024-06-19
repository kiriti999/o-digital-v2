import { hash, compare, genSaltSync } from 'bcrypt';

export const hashPassword = async (password: string): Promise<string> => {
  const salt = genSaltSync(10);
  return await hash(password, salt);
};

export const comparePassword = async (
  password: string,
  hash: string,
): Promise<boolean> => {
  return await compare(password, hash);
};
