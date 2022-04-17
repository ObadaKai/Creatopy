import User from "./user";
import { ObjectType, Field, InputType } from "type-graphql";
@ObjectType({ description: "The users model" })
export class UserGQL implements User {
  @Field()
  id: number;
  @Field()
  name: string;
  @Field()
  surname: string;
  @Field()
  email: string;
  @Field()
  password: string;
}

@InputType()
export class UserGQLInput implements Partial<User> {
  @Field({ nullable: true })
  id?: number;
  @Field()
  name: string;
  @Field()
  surname: string;
  @Field()
  email: string;
  @Field()
  password: string;
}
