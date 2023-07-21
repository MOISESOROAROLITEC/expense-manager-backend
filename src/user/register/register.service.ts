import { Injectable } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.dto';
import * as GraphQLTypes from 'src/graphql-types';
import { PrismaClient } from '@prisma/client'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { UserInputError } from '@nestjs/apollo';

const prisma = new PrismaClient()

@Injectable()
export class RegisterService {
  constructor() { }

  async create(createUserInput: CreateUserInput): Promise<GraphQLTypes.User> {
    try {
      return await prisma.user.create({ data: createUserInput })
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === "P2002") {
          throw new UserInputError(`L'email '${createUserInput.email}' est déjà utilisé`)
        }
      }
      throw new UserInputError(`Une erreur server s'est produite`)
    }
  }
}
