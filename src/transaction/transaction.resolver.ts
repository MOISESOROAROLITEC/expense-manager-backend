import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { TransactionService } from './transaction.service';
import * as GrapQLTypes from 'src/graphql-types';
import { CreateTransactionDto } from './dto/create-transaction.dto';

@Resolver()
export class TransactionResolver {
  constructor(private readonly transactyionServices: TransactionService) {
  }

  @Mutation("createTransaction")
  async create(@Args("createTransactionInput") createTransactionInput: CreateTransactionDto, @Context() req: { user: GrapQLTypes.User }): Promise<GrapQLTypes.Transaction> {
    return this.transactyionServices.create(req.user.id, createTransactionInput)
  }
}
