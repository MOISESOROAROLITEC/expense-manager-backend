import { UserInputError } from "@nestjs/apollo";

export function ReturnError(message: string): UserInputError {
  return new UserInputError(message);
}

export function loginError(): UserInputError {
  return ReturnError("L'email ou le mot de passe est incorrect");
}
