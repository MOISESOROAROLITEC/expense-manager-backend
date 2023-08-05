import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { PrismaClient } from '@prisma/client';
import { User } from 'src/graphql-types';

const prisma = new PrismaClient()

@Resolver("User")
export class TrransactionsFieldsResolver {
  @ResolveField("transactions")
  async getUserTransactions(@Parent() user : User){
    return await prisma.transaction.findMany({where:{userId: user.id}})
  }
}
