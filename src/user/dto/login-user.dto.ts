import { Length, IsString } from "class-validator";
import * as GraphQLTypes from "src/graphql-types";

export class LoginUserInputDTO extends GraphQLTypes.LoginUserInput {
  @IsString({ message: "L'email ou le mot de passe doit être une chaîne de caractère" })
  emailOrPhone: string;

  @Length(8, 50, {
    message: "Le mot de pass doit contenire au moin 8 caractères et au plus 50.",
  })
  password: string;
}
