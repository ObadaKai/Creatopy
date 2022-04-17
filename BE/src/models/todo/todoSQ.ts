import { Table, Model, Column, ForeignKey, CreatedAt, BelongsTo } from "sequelize-typescript";
import { DataTypes, Optional } from "sequelize";
import Todo from "./todo";
import UserSQ from "../user/userSQ";

@Table({ timestamps: true, tableName: "Todo" })
export default class TodoSQ extends Model<Todo, Optional<Todo, "id">> implements Todo {
  @Column({
    primaryKey: true,
    type: DataTypes.NUMBER
  })
  id: number;
  @Column(DataTypes.STRING)
  title: string;
  @ForeignKey(() => UserSQ)
  @Column(DataTypes.STRING)
  userID: string;
  @BelongsTo(() => UserSQ)
  user: UserSQ;
  @CreatedAt
  createdAt: Date;
}
