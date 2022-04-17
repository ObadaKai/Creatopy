import UserService from "../../../services/userService";
import { Resolver, Mutation, Arg, Query } from "type-graphql";
import { UserGQL, UserGQLInput } from "../../../models/user/userGQL";

@Resolver(() => UserGQL)
export default class UserResolver {
  private userService = new UserService();
  @Query(() => UserGQL, { nullable: false })
  async returnSingleUser(@Arg("id") id: number) {
    return this.userService.returnSingleUser(id);
  }

  @Query(() => [UserGQL])
  async returnAllUsers() {
    return this.userService.returnAllUsers();
  }

  @Mutation(() => UserGQL)
  async createUser(@Arg("data") data: UserGQLInput): Promise<UserGQL> {
    return this.userService.createUser(data);
  }

  @Mutation(() => Boolean)
  async deleteUser(@Arg("id") id: number) {
    return this.userService.deleteUser(id);
  }
}
