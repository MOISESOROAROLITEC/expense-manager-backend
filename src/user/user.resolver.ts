import { Args, Mutation, Query, Resolver, Context } from "@nestjs/graphql";
import * as GraphQLTypes from "src/graphql-types";
import { CreateUserInputDTO } from "./dto/create-user.dto";
import { UserService } from "./user.service";
import { LoginUserInputDTO } from "./dto/login-user.dto";
import { UseGuards } from "@nestjs/common";
import { AdminGuard } from "src/shared/guards/admin/admin.guard";
import { Public } from "src/shared/decorators/public/public.decorator";
import { UserFromContext } from "src/shared/interfaces";
import { UserInputError } from "@nestjs/apollo";
import { loginError, returnError } from "src/shared/throw-errors";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { UpdateUserInputDTO } from "./dto/update-user.dto";
import { catchUserUniqueContrainteError } from "./utilities/catch-errors";

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
  async getUserInformationByToken(
    @Context() req: UserFromContext,
  ): Promise<GraphQLTypes.User> {
    return req.user;
  }

  @Public()
  @Mutation("createUser")
  async create(
    @Args("createUserInput") createUserInput: CreateUserInputDTO,
  ): Promise<GraphQLTypes.User | UserInputError> {
    try {
      return await this.userService.create(createUserInput);
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === "P2002") {
          return catchUserUniqueContrainteError(error, createUserInput);
        }
      }
      return returnError();
    }
  }

  @Public()
  @Mutation("loginUser")
  async login(
    @Args("loginUserInput") loginUserInput: LoginUserInputDTO,
  ): Promise<GraphQLTypes.User | UserInputError> {
    try {
      const { email, phone } = loginUserInput;
      if (!email && !phone) {
        return returnError(
          "Utilisez votre email ou votre numéro de téléphone pour vous connecter",
        );
      }
      return await this.userService.login(loginUserInput);
    } catch (error) {
      return loginError(loginUserInput);
    }
  }

  @Mutation("updateUser")
  async update(
    @Args("updateUserInput") updateUserInput: UpdateUserInputDTO,
    @Context() req: UserFromContext,
  ): Promise<GraphQLTypes.User | UserInputError> {
    try {
      return await this.userService.update(req.user, updateUserInput);
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === "P2002") {
          return catchUserUniqueContrainteError(error, updateUserInput);
        }
      }
      return returnError();
    }
  }

  @Query("getUserByToken")
  async getUserByToken(
    @Context() req: UserFromContext,
  ): Promise<GraphQLTypes.User | UserInputError> {
    try {
      return req.user;
    } catch (error) {
      return returnError();
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

  @Mutation("deleteUserByEmailOrPhone")
  @Public()
  async deleteUserByEmail(
    @Args("email") email: string,
  ): Promise<GraphQLTypes.User | UserInputError> {
    try {
      return await this.userService.deleteUserByEmail(email);
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === "P2025") {
          return returnError(`L'email ${email} n'appartient à aucun utilisateur`);
        }
      }
      return returnError();
    }
  }
}
