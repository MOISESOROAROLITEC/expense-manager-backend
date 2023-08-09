import { Injectable } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.dto';
import * as GraphQLTypes from 'src/graphql-types';
import { PrismaClient } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { UserInputError } from '@nestjs/apollo';
import {
  comparePassword,
  generateToken,
  getUserByToken,
  hashPassword,
} from 'src/shared/user-utilities';
import { LoginUserInput } from './dto/login-user.dto';
import { loginError } from 'src/shared/throw-errors';

const prisma = new PrismaClient();

@Injectable()
export class UserService {
  async getUsers(): Promise<GraphQLTypes.User[]> {
    const users = await prisma.user.findMany();
    return users;
  }

  async create(createUserInput: CreateUserInput): Promise<GraphQLTypes.User> {
    try {
      const { name, email, password, birthDay, amount, target } =
        createUserInput;
      const passwordHashed = await hashPassword(password);

      const user = await prisma.user.create({
        data: {
          name,
          email,
          password: passwordHashed,
          birthDay,
          amount,
          target,
        },
      });
      const token = generateToken({ id: user.id, name: user.name });
      await prisma.user.update({
        where: { email },
        data: { token },
      });

      return { ...user, token };
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new UserInputError(
            `L'email '${createUserInput.email}' est déjà utilisé`,
          );
        }
      }
      throw new UserInputError(`Une erreur server s'est produite`);
    }
  }

  async login(loginUserInput: LoginUserInput): Promise<GraphQLTypes.User> {
    try {
      const { email, password } = loginUserInput;
      const user = await prisma.user.findUnique({ where: { email } });
      if (!user) {
        loginError();
      }
      const isMatch = comparePassword(password, user.password);
      if (!isMatch) {
        loginError();
      }
      return { ...user };
    } catch (error) {
      loginError();
    }
  }

  async getUserByToken(token: string): Promise<GraphQLTypes.User> {
    const { status, message, user } = await getUserByToken(token);
    if (status !== 200) {
      throw new UserInputError(message);
    }
    return user;
  }

  async updateUserTarget(
    user: GraphQLTypes.User,
    newTarget: number,
  ): Promise<GraphQLTypes.User> {
    try {
      const userUpdated = await prisma.user.update({
        where: { id: user.id },
        data: { target: newTarget },
      });
      return userUpdated;
    } catch (error) {
      throw new UserInputError(
        "Impossible de modifier votre objectif, une erreur s'est produite. Veillez réesayer",
      );
    }
  }
}
