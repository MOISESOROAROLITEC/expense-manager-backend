import { IsEmail } from "class-validator";

export class ValidateEmailInput {
  @IsEmail({}, { message: "L'email que vous avez entré est incorrecte" })
  email: string;
}
