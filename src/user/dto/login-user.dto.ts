import { IsEmail, MaxLength, MinLength } from 'class-validator';
import * as GraphQLTypes from 'src/graphql-types';

export class LoginUserInput extends GraphQLTypes.LoginUserInput {  
  @IsEmail({}, { message: "L'email Que vous avez entré est incorrecte" })
  email: string;

  @MinLength(8, {    message: 'Le mot de pass doit contenire au moin 8 caractères', })
  @MaxLength(50, {    message: 'Le mot de pass doit contenire au plus 50 caractères', })
  password: string;
}
