import UserSQ from "../models/user/userSQ";
import User from "../models/user/user";
import { compareHash, generateHash } from "../utils/utils";

export default class UserService {
  async createUser(user: Omit<User, "id">) {
    user.password = await generateHash(user.password);
    return (await UserSQ.create(user)).get();
  }

  async resetUserPassword(email: string, oldPassowrd: string, newPassword: string) {
    const user = await this.getUserByEmailAndPassword(email, oldPassowrd);
    user.password = await generateHash(newPassword);
    await UserSQ.update({ password: user.password }, { where: { id: user.id } });
    return user;
  }

  async getUserByEmailAndPassword(email: string, password: string) {
    const user = await UserSQ.findOne({ where: { email } });
    if (!user || !(await compareHash(password, user.password))) throw new Error("Either email or oldPassword is incorrect");
    return user.get();
  }
}
