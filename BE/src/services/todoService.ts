import Todo from "../models/todo/todo";
import TodoSQ from "../models/todo/todoSQ";

export default class TodoService {
  returnSingleUser(id: number) {
    return TodoSQ.findByPk(id);
  }
  returnAllUsers() {
    return TodoSQ.findAll();
  }
  createUser(todo: Omit<Todo, "id">) {
    return TodoSQ.create(todo);
  }
  deleteUser(id: number) {
    return TodoSQ.destroy({ where: { id } });
  }
}
