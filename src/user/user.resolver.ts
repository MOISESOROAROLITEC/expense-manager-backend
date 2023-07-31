import { Args, Mutation, ResolveField, Query, Resolver } from '@nestjs/graphql';
import * as GraphQLTypes from 'src/graphql-types';
import { CreateUserInput } from './dto/create-user.dto';
import { UserService } from './user.service';
import { LoginUserInput } from './dto/login-user.dto';

@Resolver('user')
export class UserResolver {
  constructor(private readonly userService: UserService) { }

  @Query('users')
  async findAll(): Promise<GraphQLTypes.User[]> {
    return this.userService.getUsers()
  }

  @Mutation('createUser')
  async create(
    @Args('createUserInput') createUserInput: CreateUserInput,
  ): Promise<GraphQLTypes.User> {
    return this.userService.create(createUserInput);
  }

  @Query('getUserByToken')
  async uploadImage(@Args("token") token: string): Promise<GraphQLTypes.User> {
    return this.userService.getUserByToken(token);
  }

  @Mutation("loginUser")
  async login(
    @Args("loginUserInput") loginUserInput: LoginUserInput
  ): Promise<GraphQLTypes.User> {
    return this.userService.login(loginUserInput);
  }
}
