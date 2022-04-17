import { Table, Model, Column, ForeignKey, CreatedAt, BelongsTo, Unique, AutoIncrement, PrimaryKey } from "sequelize-typescript";
import { DataTypes, Optional } from "sequelize";
import Todo from "./todo";
import UserSQ from "../user/userSQ";

@Table({ timestamps: true, tableName: "Todo" })
export default class TodoSQ extends Model<Todo, Optional<Todo, "id">> implements Todo {
  @Unique
  @AutoIncrement
  @PrimaryKey
  @Column(DataTypes.INTEGER)
  id: number;
  @Column(DataTypes.STRING)
  title: string;
  @ForeignKey(() => UserSQ)
  @Column(DataTypes.NUMBER)
  userID: number;
  @BelongsTo(() => UserSQ)
  user: UserSQ;
  @CreatedAt
  createdAt: Date;
}
