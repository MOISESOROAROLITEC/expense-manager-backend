import { IsEmail } from "class-validator";

export class ValidateEmailInput {
  @IsEmail({}, { message: "L'email entré est incorrecte" })
  email: string;
}
