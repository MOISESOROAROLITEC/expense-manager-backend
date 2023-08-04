import { Args, Mutation, Query, Resolver, Context } from '@nestjs/graphql';
import * as GraphQLTypes from 'src/graphql-types';
import { CreateUserInput } from './dto/create-user.dto';
import { UserService } from './user.service';
import { LoginUserInput } from './dto/login-user.dto';
import { Request } from 'express';
import { UseGuards } from '@nestjs/common';
import { AdminGuard } from 'src/shared/guards/admin/admin.guard';
import { Public } from 'src/shared/decorators/public/public.decorator';
import { User } from 'src/shared/decorators/user/user.decorator';

@Resolver('user')
export class UserResolver {
  constructor(private readonly userService: UserService) { }

  @Query('users')
  @UseGuards(new AdminGuard())
  async findAll(): Promise<GraphQLTypes.User[]> {
    return this.userService.getUsers();
  }

  @Mutation('createUser')
  @Public()
  async create(
    @Args('createUserInput') createUserInput: CreateUserInput,
  ): Promise<GraphQLTypes.User> {
    return this.userService.create(createUserInput);
  }

  @Public()
  @Mutation("loginUser")
  async login(
    @Args("loginUserInput") loginUserInput: LoginUserInput
  ): Promise<GraphQLTypes.User> {
    return this.userService.login(loginUserInput)
  }

  @Query('getUserByToken')
  async getUserInformationByToken(@Context() req:{user:GraphQLTypes.User}): Promise<GraphQLTypes.User> {
    return req.user
  }

}
