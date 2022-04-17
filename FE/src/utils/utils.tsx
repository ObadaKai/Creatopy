import User from "../models/app/user";

export default class Utils {
  static saveUser(user?: User) {
    if (user) localStorage.setItem("user", JSON.stringify(user));
    else localStorage.removeItem("user");
  }

  static getUser() {
    const userObjStr = localStorage.getItem("user");
    if (!userObjStr) return;
    return JSON.parse(userObjStr) as User;
  }
}
