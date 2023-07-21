import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import * as GraphQLTypes from 'src/graphql-types';
import { CreateUserInput } from './dto/create-user.dto';
import { RegisterService } from './register.service';

@Resolver('user')
export class RegisterResolver {
  constructor(private readonly registerService: RegisterService) {}

  @Query('users')
  async findAll(): Promise<GraphQLTypes.User[]> {
    console.log('je passe dans le find all');
    return [];
  }

  @Mutation('createUser')
  async create(
    @Args('createUserInput') createUserInput: CreateUserInput,
  ): Promise<GraphQLTypes.User> {
    return this.registerService.create(createUserInput);
  }
}
