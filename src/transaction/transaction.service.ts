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
      const { transactionType, amount, accountType, date, subject } = createTransactionInput;
      if (amount <= 0) {
        throw new UserInputError("Le montant d'une transaction doit être supérieur à zéro");
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
        "Impossible de faire la transaction, le message d'erreur est : " + err.message,
      );
    }
  }

  async getUserTransactions(userId: number): Promise<GrapQLTypes.Transaction[]> {
    const transactions = await prisma.transaction.findMany({
      where: { userId },
    });
    return transactions;
  }

  async removeTransaction(
    transactionId: number,
    user: GrapQLTypes.User,
  ): Promise<GrapQLTypes.Transaction> {
    try {
      let amountLeft: number;
      const transaction = await prisma.transaction.findUnique({
        where: { id: transactionId },
      });

      if (transaction.transactionType === "Credit") {
        amountLeft = user.amount - transaction.amount;
      } else {
        amountLeft = user.amount + transaction.amount;
      }

      if (amountLeft < 0) {
        throw new Error(
          "Impossible d'annuler cette transaction car le montant de votre compte sera négatif",
        );
      }

      await prisma.user.update({
        where: { id: user.id },
        data: { amount: amountLeft },
      });

      const transactionRemoved = await prisma.transaction.update({
        where: { id: transactionId, userId: user.id },
        data: { deletedAt: new Date() },
      });
      return transactionRemoved;
    } catch (error) {
      if (error instanceof Error) {
        throw new UserInputError(error.message);
      } else {
        throw new UserInputError(
          "Impossible de suprimer cette transaction, une erreur s'est produite",
        );
      }
    }
  }
}
