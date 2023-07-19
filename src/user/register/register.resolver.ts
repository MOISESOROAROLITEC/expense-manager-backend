import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import * as GraphQLTypes from 'src/graphql-types';

@Resolver('user')
export class RegisterResolver {
  constructor() {}

  @Query('users')
  async findAll(): Promise<GraphQLTypes.User[]> {
    console.log('je passe dans le find all');
    return [];
  }

  @Mutation('createUser')
  async create(
    @Args('createUserInput') createUserInput: GraphQLTypes.CreateUserInput,
  ): Promise<GraphQLTypes.User> {
    console.log('la saisie ', createUserInput);
    return;
  }
}
