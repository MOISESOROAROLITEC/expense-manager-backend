import { Args, Mutation, Query, Resolver, Context } from "@nestjs/graphql";
import * as GraphQLTypes from "src/graphql-types";
import { CreateUserInput } from "./dto/create-user.dto";
import { UserService } from "./user.service";
import { LoginUserInput } from "./dto/login-user.dto";
import { UseGuards } from "@nestjs/common";
import { AdminGuard } from "src/shared/guards/admin/admin.guard";
import { Public } from "src/shared/decorators/public/public.decorator";
import { UserFromContext } from "src/shared/interfaces";
import { UserInputError } from "@nestjs/apollo";
import { loginError } from "src/shared/throw-errors";

@Resolver()
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query("users")
  @UseGuards(new AdminGuard())
  async findAll(): Promise<GraphQLTypes.User[]> {
    return this.userService.getUsers();
  }

  @Query("user")
  async getUserInformationByToken(
    @Context() req: UserFromContext,
  ): Promise<GraphQLTypes.User> {
    return req.user;
  }

  @Mutation("createUser")
  @Public()
  async create(
    @Args("createUserInput") createUserInput: CreateUserInput,
  ): Promise<GraphQLTypes.User | UserInputError> {
    return this.userService.create(createUserInput);
  }

  @Public()
  @Mutation("loginUser")
  async login(
    @Args("loginUserInput") loginUserInput: LoginUserInput,
  ): Promise<GraphQLTypes.User | UserInputError> {
    try {
      return await this.userService.login(loginUserInput);
    } catch (error) {
      return loginError();
    }
  }

  @Mutation("updateUserTarget")
  async updateUserTarget(
    @Args("target") target: number,
    @Context() req: UserFromContext,
  ): Promise<GraphQLTypes.User> {
    return this.userService.updateUserTarget(req.user, target);
  }

  @Mutation("deleteUsers")
  @Public()
  async deleteUsers(): Promise<{ count: number }> {
    return await this.userService.deleteUsers();
  }

  @Mutation("deleteUserByEmail")
  @Public()
  deleteUserByEmail(@Args("email") email: string): Promise<GraphQLTypes.User> {
    try {
      return this.userService.deleteUserByEmail(email);
    } catch (error) {}
  }
}
