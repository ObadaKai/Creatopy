import bcrypt from "bcrypt";
export const generateHash = async (password: string) => {
  // generate salt to hash password
  const salt = await bcrypt.genSalt(10);
  // now we set user password to hashed password
  return bcrypt.hash(password, salt);
};
export const compareHash = async (password: string, passwordHashed: string) => {
  return bcrypt.compare(password, passwordHashed);
};
