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
import { loginError, returnError } from "src/shared/throw-errors";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

@Resolver()
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query("users")
  @UseGuards(new AdminGuard())
  async findAll(): Promise<GraphQLTypes.User[] | UserInputError> {
    try {
      return await this.userService.getUsers();
    } catch (error) {
      return returnError();
    }
  }

  @Query("user")
  async getUserInformationByToken(@Context() req: UserFromContext): Promise<GraphQLTypes.User> {
    return req.user;
  }

  @Mutation("createUser")
  @Public()
  async create(
    @Args("createUserInput") createUserInput: CreateUserInput,
  ): Promise<GraphQLTypes.User | UserInputError> {
    try {
      return await this.userService.create(createUserInput);
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === "P2002") {
          return returnError(`L'email '${createUserInput.email}' est déjà utilisé`);
        }
      }
      return returnError();
    }
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
  ): Promise<GraphQLTypes.User | UserInputError> {
    try {
      return await this.userService.updateUserTarget(req.user, target);
    } catch (error) {
      return returnError(
        "Impossible de modifier votre objectif, une erreur s'est produite. Veillez réesayer",
      );
    }
  }

  @Mutation("deleteUsers")
  @Public()
  async deleteUsers(): Promise<{ count: number } | UserInputError> {
    try {
      return await this.userService.deleteUsers();
    } catch (error) {
      return returnError("Impossible de supprimer les utilisateurs");
    }
  }

  @Mutation("deleteUserByEmail")
  @Public()
  async deleteUserByEmail(
    @Args("email") email: string,
  ): Promise<GraphQLTypes.User | UserInputError> {
    try {
      return await this.userService.deleteUserByEmail(email);
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === "P2025") {
          return returnError(
            `L'email ${email} n'appartient à aucun utilisateur : PrismaClientKnownRequestError`,
          );
        }
      }
      return returnError();
    }
  }
}
