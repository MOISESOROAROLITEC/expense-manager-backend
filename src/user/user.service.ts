import { Injectable } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.dto';
import * as GraphQLTypes from 'src/graphql-types';
import { PrismaClient } from '@prisma/client'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { UserInputError } from '@nestjs/apollo';
import { comparePassword, generateToken, hashPassword } from 'src/shared/user-utilities';
import { LoginUserInput } from './dto/login-user.dto';
import { loginError } from 'src/shared/throw-errors';

const prisma = new PrismaClient()

@Injectable()
export class UserService {
  constructor() { }

  async create(createUserInput: CreateUserInput): Promise<GraphQLTypes.User> {
    try {
      const passwordHashed = await hashPassword(createUserInput.password)
      return await prisma.user.create({ data: { ...createUserInput, password: passwordHashed } })
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === "P2002") {
          throw new UserInputError(`L'email '${createUserInput.email}' est déjà utilisé`)
        }
      }
      throw new UserInputError(`Une erreur server s'est produite`)
    }
  }

  async login(loginUserInput: LoginUserInput): Promise<GraphQLTypes.LoginResponse> {
    try {
      const { email, password } = loginUserInput
      const user = await prisma.user.findUnique({ where: { email } });
      if (!user) {
        loginError()
      }
      const isMatch = comparePassword(password, user.password);
      if (!isMatch) {
        loginError()
      }
      const token = generateToken({ id: user.id, name: user.name });
      return { ...user, token }
    } catch (error) {
      loginError()
    }
  }
}
