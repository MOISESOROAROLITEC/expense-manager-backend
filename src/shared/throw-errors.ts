import { UserInputError } from "@nestjs/apollo";
import { LoginUserInput } from "src/graphql-types";
import { isValideEmail } from "./user-utilities";

export function returnError(message?: string): UserInputError {
  if (message) {
    return new UserInputError(message);
  } else {
    return new UserInputError("Une erreur inconnue s'est produite au niveau du serveur");
  }
}

export function loginError(loginUserInput: LoginUserInput): UserInputError {
  if (Number(loginUserInput.emailOrPhone)) {
    return returnError("Le numéro de téléphone ou le mot de passe est incorrect");
  } else {
    return returnError("L'email ou le mot de passe est incorrect");
  }
}
