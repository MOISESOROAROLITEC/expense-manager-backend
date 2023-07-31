import { User } from "@prisma/client";


export interface tokenDecryptedInterface extends User {
	iat: number;
	exp: number;
}

export interface GetUserByToken {
	status: number,
	message: string,
	user?: User | null
}