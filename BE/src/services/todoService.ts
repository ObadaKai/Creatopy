import Todo from "../models/todo/todo";
import TodoSQ from "../models/todo/todoSQ";

export default class TodoService {
  async getAllTodosByUserID(userID: number) {
    return (await TodoSQ.findAll({ where: { userID } })).map((x) => x.get());
  }
  async createTodo(todo: Omit<Todo, "id">) {
    return (await TodoSQ.create(todo)).get();
  }
  deleteTodo(id: number) {
    return TodoSQ.destroy({ where: { id } });
  }
}
