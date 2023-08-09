import { UserInputError } from "@nestjs/apollo";
import { Injectable } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";
import * as GrapQLTypes from "src/graphql-types";

const prisma = new PrismaClient();

@Injectable()
export class TransactionService {
  async create(
    userId: number,
    oldAmount: number,
    createTransactionInput: GrapQLTypes.CreateTransactionInput,
  ): Promise<GrapQLTypes.Transaction> {
    try {
      const { transactionType, amount, accountType, date, subject } =
        createTransactionInput;
      if (amount <= 0) {
        throw new UserInputError(
          "Le montant d'une transaction doit être supérieur à zéro",
        );
      }
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
          accountType,
          amount,
          subject,
          date,
          userId,
        },
      });

      await prisma.user.update({
        where: { id: userId },
        data: { amount: amountUpdated },
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
