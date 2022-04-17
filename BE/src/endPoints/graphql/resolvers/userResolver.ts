import UserService from "../../../services/userService";
import { Resolver, Mutation, Arg, Query } from "type-graphql";
import { UserGQL, UserGQLInput } from "../../../models/user/userGQL";

@Resolver(() => UserGQL)
export default class UserResolver {
  private userService = new UserService();

  @Query(() => UserGQL, { nullable: true })
  async getUserByEmailAndPassword(@Arg("email") email: string, @Arg("password") password: string) {
    return this.userService.getUserByEmailAndPassword(email, password);
  }

  @Mutation(() => UserGQL)
  async resetUserPassword(@Arg("email") email: string, @Arg("oldPassowrd") oldPassowrd: string, @Arg("newPassword") newPassword: string): Promise<UserGQL> {
    return this.userService.resetUserPassword(email, oldPassowrd, newPassword);
  }

  @Mutation(() => UserGQL)
  async createUser(@Arg("data") data: UserGQLInput): Promise<UserGQL> {
    return this.userService.createUser(data);
  }
}
