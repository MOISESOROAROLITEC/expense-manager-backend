import { Mutation, Resolver } from '@nestjs/graphql';
import { TransactionService } from './transaction.service';
import * as GrapQLTypes from 'src/graphql-types';

@Resolver("transaction")
export class TransactionResolver {
  constructor(private readonly transactyionServices: TransactionService) {
  }

  @Mutation("createTransaction")
  async create(): Promise<GrapQLTypes.Transaction> {
    return this.transactyionServices.create()
  }
}
