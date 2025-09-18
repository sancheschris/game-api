import { ApolloServer } from "apollo-server";
import { typeDefs } from "./schema/schema";
import { resolvers } from "./resolvers";

export const createApp = () => {
  return new ApolloServer({
    typeDefs,
    resolvers,
  });
};
