import { Args, Context, Parent, ResolveField, Resolver } from "@nestjs/graphql";
import { PrismaClient } from "@prisma/client";
import * as GraphQLTypes from "src/graphql-types";
import { UserFromContext } from "src/shared/interfaces";

const prisma = new PrismaClient();

@Resolver("User")
export class TrransactionsFieldsResolver {
  @ResolveField("transactions")
  async getUserTransactions(
    @Parent() user: GraphQLTypes.User,
    @Args("pageSize") pageSize: number,
    @Args("offset") offset: number,
    @Context() req: UserFromContext,
  ): Promise<GraphQLTypes.Transactions> {
    const transactions = await prisma.transaction.findMany({
      where: { userId: user.id },
      take: pageSize,
      skip: offset,
      orderBy: { createAt: "desc" },
    });

    const count = await prisma.transaction.count({
      where: { userId: user.id },
    });

    return { totalCount: count, transactions };
  }
}
