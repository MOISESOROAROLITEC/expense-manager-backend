import {
  IsDate,
  IsEmail,
  IsPhoneNumber,
  IsString,
  Length,
  MaxLength,
  MinLength,
} from "class-validator";
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

  @IsPhoneNumber(undefined, {
    message: (phone) =>
      `Le numéro de téléphone est incorrect ${
        (phone.value as string).startsWith("+") ? "" : "Veillez le prééder d'un '+'"
      }`,
  })
  phone: string;

  @IsString()
  @MinLength(3, {
    message: "Le nom du pays de residence doit contenir au moin 3 caractères ",
  })
  @MaxLength(50, {
    message: "Le nom du pays de residence doit contenir au plus 50 caractères ",
  })
  countryResidence: string;

  @IsString()
  @MinLength(3, {
    message: "Le nom du pays d'origine doit contenir au moin 3 caractères ",
  })
  @MaxLength(50, {
    message: "Le nom du pays d'origine doit contenir au plus 50 caractères ",
  })
  originCountry: string;
}
