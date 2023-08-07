import { AccountTypes, TransactionType } from "src/shared/constances";
import * as GraphQLTypes from "../../graphql-types"
import { IsEnum, IsOptional, IsPositive, IsString } from "class-validator";

export class CreateTransactionDto extends GraphQLTypes.CreateTransactionInput {
  @IsEnum(TransactionType, { message: `Le type d'une transaction doit être soit 'Debit' soit 'Credit'` })
  type: string;

  @IsEnum(AccountTypes, { message: `Le type de compte doit être : Banque ou Caisse` })
  accountType: string;

  @IsOptional()
  subject?: string;

  @IsPositive({ message: "Le montant d'une transaction doit être supperieur à zéro" })
  amount: number;

}
