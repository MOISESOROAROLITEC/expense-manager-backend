import { UserInputError } from "@nestjs/apollo";
import { Injectable } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";
import * as GrapQLTypes from "src/graphql-types";

const prisma = new PrismaClient();

@Injectable()
export class TransactionService {
  async create(
    createTransactionInput: GrapQLTypes.CreateTransactionInput,
  ): Promise<GrapQLTypes.Transaction> {
    try {
      const { transactionType, amount, date, subject, chalengeId } =
        createTransactionInput;

      const chalenge = await prisma.chalenge.findUniqueOrThrow({
        where: { id: chalengeId },
      });
      const oldAmount = chalenge.amount;
      let amountUpdated: number;
      if (transactionType === "Debit") {
        if (oldAmount < amount) {
          throw new UserInputError(
            `Le montant du debit est supperieur au montant du compte. Le solde actuel est : ${oldAmount} `,
          );
        }
        amountUpdated = oldAmount - amount;
      } else {
        amountUpdated = oldAmount + amount;
      }
      const transaction = await prisma.transaction.create({
        data: {
          transactionType,
          amount,
          subject,
          date,
          chalengeId,
        },
      });

      await prisma.chalenge.update({
        where: { id: chalengeId },
        data: { amount: amountUpdated },
      });
      return transaction;
    } catch (error) {
      const err = error as Error;

      throw new UserInputError(
        "Impossible de faire la transaction, le message d'erreur est : " + err.message,
      );
    }
  }

  async getUserTransactions(userId: number): Promise<GrapQLTypes.Transaction[]> {
    return;
  }
}
