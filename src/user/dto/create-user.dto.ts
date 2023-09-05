import { IsDate, IsEmail, IsPhoneNumber, IsString, Length } from "class-validator";
import * as GraphQLTypes from "src/graphql-types";

export class CreateUserInputDTO extends GraphQLTypes.CreateUserInput {
  @Length(8, 50, {
    message: "Le nom doit contenir au moins 3 caractères et au plus 50.",
  })
  name: string;

  @IsEmail({}, { message: "L'email entré est incorrecte" })
  email: string;

  @Length(8, 50, {
    message: "Le mot de pass doit contenir au moin 8 caractères et au plus 50.",
  })
  password: string;

  @IsDate({ message: "La date est incorrect, elle doit être une instace de Date" })
  birthday: Date;

  @IsPhoneNumber(undefined, { message: "Le numéro de téléphone est incorrect" })
  phone: string;

  @IsString()
  countryResidence: string;

  @IsString()
  originCountry: string;
}
