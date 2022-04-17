import { TodoGQL, TodoGQLInput } from "../../../models/todo/todoGQL";
import { Resolver, Mutation, Arg, Query } from "type-graphql";
import TodoService from "../../../services/todoService";

@Resolver(() => TodoGQL)
export default class TodoResolver {
  private todoService = new TodoService();
  @Query(() => TodoGQL, { nullable: false })
  async returnSingleTodo(@Arg("id") id: number) {
    return this.todoService.returnSingleUser(id);
  }

  @Query(() => [TodoGQL])
  async returnAllTodoG() {
    return this.todoService.returnAllUsers();
  }

  @Mutation(() => TodoGQL)
  async createTodo(@Arg("data") data: TodoGQLInput): Promise<TodoGQL> {
    return this.todoService.createUser(data);
  }

  @Mutation(() => Boolean)
  async deleteTodo(@Arg("id") id: number) {
    return this.todoService.deleteUser(id);
  }
}
