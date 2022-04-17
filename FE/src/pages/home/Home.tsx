import { useLazyQuery, useMutation } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Todo from "../../models/app/todo";
import User from "../../models/app/user";
import { createTodoMutation, deleteTodoMutation } from "../../models/graphql/mutations";
import { getAllTodosByUserIDQuery } from "../../models/graphql/queries";
import RoutePaths from "../../router/routePaths";
import Utils from "../../utils/utils";
import "./Home.scss";

export default function HomePage() {
  const [todoList, setTodoList] = useState<Todo[]>([]);
  const [addNewInput, setAddNewInput] = useState("");
  const [user, setUser] = useState<User>();
  const [getAllTodosByUserIDCall, { data }] = useLazyQuery<{ getAllTodosByUserID: Todo[] }>(getAllTodosByUserIDQuery);
  const [createTodoCall] = useMutation<{ createTodo: Todo }>(createTodoMutation);
  const [deleteTodoCall] = useMutation<{ deleteTodo: boolean }>(deleteTodoMutation);

  useEffect(() => {
    const userInLocalStorage = Utils.getUser();
    if (!userInLocalStorage) return;
    setUser(userInLocalStorage);
    getAllTodosByUserIDCall({ variables: { userID: userInLocalStorage.id } });
  }, []);

  useEffect(() => {
    if (data?.getAllTodosByUserID && data.getAllTodosByUserID.length > 0) setTodoList(todoList?.concat(data.getAllTodosByUserID));
  }, [data]);

  if (!data) return <div>Loading...</div>;

  const deleteTodo = async (id: number) => {
    await deleteTodoCall({ variables: { id } });
    setTodoList((list) => [...list.filter((x) => x.id !== id)]);
  };

  const addTodo = async () => {
    if (!addNewInput || !user) return;
    const todo: Omit<Todo, "id"> = {
      title: addNewInput,
      userID: user.id
    };
    const createResult = await createTodoCall({ variables: { data: todo } });
    if (createResult?.data) setTodoList((list) => [...list, createResult.data?.createTodo!]);
    setAddNewInput("");
  };

  return (
    <div className="floating-box-wrapper">
      <div className="floating-box">
        <h1>
          Todo List{" "}
          <Link to={RoutePaths.login} onClick={() => {
            Utils.saveUser()
          }}>
            Log out
          </Link>{" "}
        </h1>
        <ul className="todo-list-ul">
          {todoList?.map((todo) => (
            <li key={`${todo.id}_${todo.title}`}>
              <span>{todo.title}</span>
              <button onClick={() => deleteTodo(todo.id)}>Delete</button>
            </li>
          ))}
        </ul>

        <input name="addNewInput" value={addNewInput} onChange={(e) => setAddNewInput(e.target.value)}></input>
        <button onClick={addTodo}>Add new todo</button>
      </div>
    </div>
  );
}
