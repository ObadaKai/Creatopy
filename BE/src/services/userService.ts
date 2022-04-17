import UserSQ from "../models/user/userSQ";
import User from "../models/user/user";

export default class UserService {
  returnSingleUser(id: number) {
    return UserSQ.findByPk(id);
  }
  returnAllUsers() {
    return UserSQ.findAll();
  }
  createUser(user: Omit<User, "id">) {
    return UserSQ.create(user);
  }
  deleteUser(id: number) {
    return UserSQ.destroy({ where: { id } });
  }
}
