import { accountTypeEnum, transactionTypeEnum } from "src/shared/constances";
import * as GraphQLTypes from "../../graphql-types";
import {
  IsDateString,
  IsEnum,
  IsOptional,
  IsPositive,
  IsString,
} from "class-validator";

export class CreateTransactionDto extends GraphQLTypes.CreateTransactionInput {
  @IsEnum(transactionTypeEnum, {
    message: `Le type d'une transaction doit être soit '${transactionTypeEnum[0]}' soit '${transactionTypeEnum[1]}'`,
  })
  type: string;

  @IsEnum(accountTypeEnum, {
    message: `Le type de compte doit être : '${accountTypeEnum[0]}' ou '${accountTypeEnum[1]}' ou '${accountTypeEnum[2]}'`,
  })
  accountType: string;

  @IsOptional()
  subject?: string;

  @IsPositive({
    message: "Le montant d'une transaction doit être supperieur à zéro",
  })
  amount: number;

  @IsDateString({ strict: false })
  date: string;
}
