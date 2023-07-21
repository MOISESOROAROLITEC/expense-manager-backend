
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export class CreateUserInput {
    name: string;
    email: string;
    password: string;
    birthDay: string;
}

export class LoginUserInput {
    email: string;
    password: string;
}

export class User {
    id: number;
    name: string;
    email: string;
    password: string;
    birthDay: Date;
    createAt: Date;
}

export abstract class IQuery {
    users: User[];
}

export abstract class IMutation {
    createUser?: User;
    loginUser?: User;
}

type Nullable<T> = T | null;
