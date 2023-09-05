import { Args, Context, Mutation, Query, Resolver } from "@nestjs/graphql";
import { TransactionService } from "./transaction.service";
import * as GrapQLTypes from "src/graphql-types";
import { CreateTransactionDto } from "./dto/create-transaction.dto";
import { UserFromContext } from "src/shared/interfaces";
import { UserInputError } from "@nestjs/apollo";

@Resolver()
export class TransactionResolver {
  constructor(private readonly transactyionServices: TransactionService) {}

  @Mutation("createTransaction")
  async create(
    @Args("createTransactionInput")
    createTransactionInput: CreateTransactionDto,
    @Context() req: UserFromContext,
  ): Promise<GrapQLTypes.Transaction | UserInputError> {
    try {
      return await this.transactyionServices.create(createTransactionInput);
    } catch (error) {}
  }

  @Query("getUserTransactions")
  async getTransactions(
    @Context() req: UserFromContext,
  ): Promise<GrapQLTypes.Transaction[]> {
    return this.transactyionServices.getUserTransactions(req.user.id);
  }
}
