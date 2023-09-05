import { Injectable } from "@nestjs/common";
import * as GraphQLTypes from "src/graphql-types";
import { PrismaClient } from "@prisma/client";
import { UserInputError } from "@nestjs/apollo";
import {
  comparePassword,
  comparePasswordAndGenerateNewToken,
  generateToken,
  getUserByToken,
  hashPassword,
} from "src/shared/user-utilities";
import { returnError } from "src/shared/throw-errors";

const prisma = new PrismaClient();

@Injectable()
export class UserService {
  async getUsers(): Promise<GraphQLTypes.User[]> {
    const users = await prisma.user.findMany();
    return users;
  }

  async create(
    createUserInput: GraphQLTypes.CreateUserInput,
  ): Promise<GraphQLTypes.User | UserInputError> {
    const { name, email, phone, password, birthday, countryResidence, originCountry } =
      createUserInput;
    const passwordHashed = await hashPassword(password);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: passwordHashed,
        birthday,
        countryResidence,
        originCountry,
        phone,
        parameter: { create: { showChalanges: true, showInformations: true } },
      },
    });
    const token = generateToken({ id: user.id, name: user.name });
    await prisma.user.update({
      where: { id: user.id },
      data: { token },
    });

    return { ...user, token };
  }

  async login(loginUserInput: GraphQLTypes.LoginUserInput): Promise<GraphQLTypes.User> {
    const { email, phone, password } = loginUserInput;
    const user = await prisma.user.findUniqueOrThrow({ where: { email, phone } });
    const newToken = await comparePasswordAndGenerateNewToken(user, password);
    return await prisma.user.update({
      where: { id: user.id },
      data: { token: newToken },
    });
  }

  async update(
    user: GraphQLTypes.User,
    updateUserInput: GraphQLTypes.UpdateUserInput,
  ): Promise<GraphQLTypes.User | UserInputError> {
    const { oldPassword, ...updateData } = updateUserInput;
    const { password, email, phone } = updateUserInput;
    if (password || email || phone) {
      if (!oldPassword) {
        return returnError(
          "Pour modifier le mot de passe, l'email ou le numero de téléphone vous dévez entrer votre ancien mot de passe.",
        );
      }
      const isMatch = comparePassword(oldPassword, user.password);
      if (!isMatch) {
        return returnError("Votre ancien mot de passe est incorrecte.");
      }
    }

    return prisma.user.update({ where: { id: user.id }, data: { ...updateData } });
  }

  async getUserByToken(token: string): Promise<GraphQLTypes.User> {
    const { status, message, user } = await getUserByToken(token);
    if (status !== 200) {
      throw new UserInputError(message);
    }
    return user;
  }

  async deleteUsers(): Promise<{ count: number }> {
    const { count } = await prisma.user.deleteMany();
    return { count };
  }

  async deleteUserByEmail(email: string): Promise<GraphQLTypes.User> {
    const user = await prisma.user.delete({ where: { email } });
    return user;
  }
}
