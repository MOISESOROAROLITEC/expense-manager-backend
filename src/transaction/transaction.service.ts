import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import * as GrapQLTypes from 'src/graphql-types';

const prisma = new PrismaClient()

@Injectable()
export class TransactionService {
  async create(user: GrapQLTypes.User, createTransactionInput: GrapQLTypes.CreateTransactionInput): Promise<GrapQLTypes.Transaction> {
    const { type, amount, accountType, subject } = createTransactionInput
    return await prisma.transaction.create({
      data: {
        type,
        accountType,
        amount,
        subject,
        userId: user.id
      }
    })
  }
}
