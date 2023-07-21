import { IsOptional } from 'class-validator';
import { IsEmail, MaxLength, MinLength } from 'class-validator';
import * as GraphQLTypes from 'src/graphql-types';

export class CreateUserInput extends GraphQLTypes.CreateUserInput {
  @MinLength(3, { message: 'Le nom doit contenire au moin 3 caractères' })
  @MaxLength(50, { message: 'Le nom doit contenire au plus 50 caractères' })
  name: string;

  
  @IsEmail({}, { message: "L'email Que vous avez entré est incorrecte" })
  email: string;

  @MinLength(8, {    message: 'Le mot de pass doit contenire au moin 8 caractères', })
  password: string;
}
