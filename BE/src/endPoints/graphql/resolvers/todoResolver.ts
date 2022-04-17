import { TodoGQL, TodoGQLInput } from "../../../models/todo/todoGQL";
import { Resolver, Mutation, Arg, Query } from "type-graphql";
import TodoService from "../../../services/todoService";

@Resolver(() => TodoGQL)
export default class TodoResolver {
  private todoService = new TodoService();

  @Query(() => [TodoGQL], { nullable: true })
  async getAllTodosByUserID(@Arg("userID") userID: number) {
    return this.todoService.getAllTodosByUserID(userID);
  }

  @Mutation(() => TodoGQL)
  async createTodo(@Arg("data") data: TodoGQLInput): Promise<TodoGQL> {
    return this.todoService.createTodo(data);
  }

  @Mutation(() => Boolean)
  async deleteTodo(@Arg("id") id: number) {
    return this.todoService.deleteTodo(id);
  }
}
