import { UserInputError } from "@nestjs/apollo";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { returnError } from "src/shared/throw-errors";

export function catchUserUniqueContrainteError(
  error: PrismaClientKnownRequestError,
  userInputData: { email: string; phone: string },
): UserInputError {
  if (error.message.endsWith(".")) {
    return returnError(error.message);
  }
  const target = error.meta.target[0];
  if (target === "email") {
    return returnError(
      `L'email '${userInputData.email}' est déjà utilisé par un autre utilisateur`,
    );
  } else if (target === "phone") {
    return returnError(
      `Le numéro '${userInputData.phone}' est déjà utilisé par un autre utilisateur`,
    );
  } else {
    return returnError(`Le champs ${target} est déjà utilisé par un autre utilisateur`);
  }
}
