import { Table, Model, Column, HasMany } from "sequelize-typescript";
import { DataTypes, Optional } from "sequelize";
import User from "./user";
import TodoSQ from "../todo/todoSQ";
import Todo from "../todo/todo";

@Table({ timestamps: true, tableName: "User" })
export default class UserSQ extends Model<User, Optional<User, "id">> implements User {
  @Column({
    primaryKey: true,
    type: DataTypes.NUMBER
  })
  id: number;
  @Column(DataTypes.STRING)
  name: string;
  @Column(DataTypes.STRING)
  surname: string;
  @Column(DataTypes.STRING)
  email: string;
  @Column(DataTypes.STRING)
  password: string;
  @HasMany(() => TodoSQ)
  todos: Todo[];
}
