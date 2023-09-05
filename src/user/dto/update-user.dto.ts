import {
  IsDate,
  IsEmail,
  IsOptional,
  IsPhoneNumber,
  IsString,
  Length,
} from "class-validator";
import * as GraphQLTypes from "src/graphql-types";

export class UpdateUserInputDTO extends GraphQLTypes.UpdateUserInput {
  @IsOptional()
  @Length(8, 50, {
    message: "Le nom doit contenir au moins 3 caractères et au plus 50.",
  })
  name: string;

  @IsOptional()
  @IsEmail({}, { message: "L'email entré est incorrecte" })
  email: string;

  @IsOptional()
  @Length(8, 50, {
    message: "Le mot de pass doit contenir au moin 8 caractères et au plus 50.",
  })
  password: string;

  @IsOptional()
  @Length(8, 50, {
    message: "Le mot de pass doit contenir au moin 8 caractères et au plus 50.",
  })
  oldPassword: string;

  @IsOptional()
  @IsDate({ message: "La date est incorrect, elle doit être une instace de Date" })
  birthday: Date;

  @IsOptional()
  @IsPhoneNumber(undefined, { message: "Le numéro de téléphone est incorrect" })
  phone: string;

  @IsOptional()
  @IsString()
  countryResidence: string;

  @IsOptional()
  @IsString()
  originCountry: string;
}
