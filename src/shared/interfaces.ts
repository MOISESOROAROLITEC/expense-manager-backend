import * as GraphQLTypes from "src/graphql-types";

export interface tokenDecryptedInterface extends GraphQLTypes.User {
  iat: number;
  exp: number;
}

export interface GetUserByToken {
  status: number;
  message: string;
  user?: GraphQLTypes.User | null;
}

export interface UserFromContext {
  user: GraphQLTypes.User;
}
