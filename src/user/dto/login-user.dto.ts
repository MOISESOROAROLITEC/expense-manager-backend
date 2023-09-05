import { IsEmail, IsOptional, IsPhoneNumber, Length } from "class-validator";
import * as GraphQLTypes from "src/graphql-types";

export class LoginUserInputDTO extends GraphQLTypes.LoginUserInput {
  @IsOptional()
  @IsPhoneNumber(undefined, { message: "Le numéro de téléphone est incorrect" })
  phone: string;

  @IsOptional()
  @IsEmail({}, { message: "L'email entré est incorrecte" })
  email: string;

  @Length(8, 50, {
    message: "Le mot de pass doit contenire au moin 8 caractères et au plus 50.",
  })
  password: string;
}
