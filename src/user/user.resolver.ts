import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import * as GraphQLTypes from 'src/graphql-types';
import { CreateUserInput } from './dto/create-user.dto';
import { UserService } from './user.service';

@Resolver('user')
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query('users')
  async findAll(): Promise<GraphQLTypes.User[]> {
    return [];
  }

  @Mutation('createUser')
  async create(
    @Args('createUserInput') createUserInput: CreateUserInput,
  ): Promise<GraphQLTypes.User> {
    return this.userService.create(createUserInput);
  }
}
