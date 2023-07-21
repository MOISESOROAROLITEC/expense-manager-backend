import { UserInputError } from "@nestjs/apollo";

export  function  throwError(message:string): UserInputError {throw new UserInputError(message)}

export function loginError(): UserInputError {
  return throwError("L'email ou le mot de passe est incorrect")
}