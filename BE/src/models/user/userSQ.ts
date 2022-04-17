import { Table, Model, Column, HasMany, Unique, AutoIncrement, PrimaryKey } from "sequelize-typescript";
import { DataTypes, Optional } from "sequelize";
import User from "./user";
import TodoSQ from "../todo/todoSQ";
import Todo from "../todo/todo";

@Table({ timestamps: true, tableName: "User" })
export default class UserSQ extends Model<User, Optional<User, "id">> implements User {
  @Unique
  @AutoIncrement
  @PrimaryKey
  @Column(DataTypes.INTEGER)
  id: number;
  @Column(DataTypes.STRING)
  name: string;
  @Column(DataTypes.STRING)
  surname: string;
  @Unique
  @Column(DataTypes.STRING)
  email: string;
  @Column(DataTypes.STRING)
  password: string;
  @HasMany(() => TodoSQ)
  todos: Todo[];
}
