import { User } from "@prisma/client";


export interface tokenDecryptedInterface {
	id: number;
	name: string;
	password?: string;
	email?: string
	iat: number;
	exp: number;
}

export interface GetUserByToken {
	status: number,
	message: string,
	user?: User | null
}