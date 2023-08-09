import { UserInputError } from '@nestjs/apollo';
import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import * as GrapQLTypes from 'src/graphql-types';

const prisma = new PrismaClient();

@Injectable()
export class TransactionService {
  async create(
    userId: number,
    oldAmount: number,
    createTransactionInput: GrapQLTypes.CreateTransactionInput,
  ): Promise<GrapQLTypes.Transaction> {
    try {
      const { type, amount, accountType, date, subject } =
        createTransactionInput;
      if (amount <= 0) {
        throw new UserInputError(
          "Le montant d'une transaction doit être supérieur à zéro",
        );
      }
      const transaction = await prisma.transaction.create({
        data: {
          type,
          accountType,
          amount,
          subject,
          date,
          userId,
        },
      });

      await prisma.user.update({
        where: { id: userId },
        data: { amount: oldAmount + amount },
      });
      return transaction;
    } catch (error) {
      const err = error as Error;

      throw new UserInputError(
        "Impossible de faire la transaction, le message d'erreur est : " +
          err.message,
      );
    }
  }
}
