import bcrypt from 'bcryptjs';

const encryptPassword = async (password: string): Promise<string> => {
  const saltRounds = 10;
  const salt = await bcrypt.genSalt(saltRounds);
  const hash = await bcrypt.hash(password, salt);
  return hash;
};

const compareHash = async (
  password: string,
  savedHash: string
): Promise<boolean> => {
  const isMatch = await bcrypt.compare(password, savedHash);
  return isMatch;
};

export { encryptPassword, compareHash };
