import { UserInputError } from "@nestjs/apollo";

export function returnError(message?: string): UserInputError {
  if (message) {
    return new UserInputError(message);
  } else {
    return new UserInputError(
      "Une erreur inconnue s'est produite au niveau du serveur",
    );
  }
}

export function loginError(): UserInputError {
  return returnError("L'email ou le mot de passe est incorrect");
}
