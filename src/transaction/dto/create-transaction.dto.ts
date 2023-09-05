import { transactionTypeEnum } from "src/shared/constances";
import * as GraphQLTypes from "../../graphql-types";
import { IsDateString, IsEnum, IsOptional, IsPositive } from "class-validator";

export class CreateTransactionDto extends GraphQLTypes.CreateTransactionInput {
  @IsEnum(transactionTypeEnum, {
    message: `Le type d'une transaction doit être soit '${transactionTypeEnum[0]}' soit '${transactionTypeEnum[1]}'`,
  })
  transactionType: string;

  @IsOptional()
  subject?: string;

  @IsPositive({
    message: "Le montant d'une transaction doit être supperieur à zéro",
  })
  amount: number;

  @IsDateString({ strict: false })
  date: string;

  @IsPositive({ message: "L'id du chalenge doit être un nombre positif." })
  chalengeId: number;
}
