import Todo from "./todo";
import { ObjectType, Field, InputType } from "type-graphql";

@ObjectType({ description: "The Todo List model" })
export class TodoGQL implements Todo {
  @Field()
  id: number;
  @Field()
  title: string;
  @Field()
  userID: string;
  @Field({ nullable: true })
  createdAt?: Date;
}

@InputType()
export class TodoGQLInput implements Partial<TodoGQL> {
  @Field({ nullable: true })
  id?: number;
  @Field()
  title: string;
  @Field()
  userID: string;
  @Field({ nullable: true })
  createdAt?: Date;
}
