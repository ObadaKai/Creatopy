import { ApolloServer } from "apollo-server-express";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import Express from "express";
import "reflect-metadata";
import { buildSchema } from "type-graphql";
import TodoResolver from "./endPoints/graphql/resolvers/todoResolver";
import UserResolver from "./endPoints/graphql/resolvers/userResolver";
import { Sequelize } from "sequelize-typescript";
import TodoSQ from "./models/todo/todoSQ";
import UserSQ from "./models/user/userSQ";

const start = async () => {
  const schema = await buildSchema({
    resolvers: [UserResolver, TodoResolver],
    emitSchemaFile: true,
    validate: false
  });

  const server = new ApolloServer({
    schema,
    plugins: [ApolloServerPluginLandingPageGraphQLPlayground],
    formatError: (err) => {
      if (process.env.NODE_ENV === "development") {
        console.error(err);
      }
      return err;
    }
  });

  const app = Express();

  await server.start();

  const sequalize = new Sequelize({
    database: "localDB",
    dialect: "sqlite",
    username: "root",
    password: "",
    storage: ":memory:",
    models: [TodoSQ, UserSQ]
  });

  try {
    await sequalize.sync();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }

  server.applyMiddleware({ app });

  app.listen({ port: 8000 }, () => console.log(`🚀 Server ready and listening at ==> http://localhost:8000${server.graphqlPath}`));
};

start().catch((error) => {
  console.log(error, "error");
});
