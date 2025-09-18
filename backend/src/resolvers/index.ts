import { userResolvers } from "./user.resolvers";
import { gameResolvers } from "./game.resolvers";

export const resolvers = {
  Query: {
    ...userResolvers.Query,
    ...gameResolvers.Query,
  },
  Mutation: {
    ...userResolvers.Mutation,
    ...gameResolvers.Mutation,
  },
  // Add other types as needed
};
