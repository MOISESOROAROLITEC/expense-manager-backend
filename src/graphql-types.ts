
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

export class LoginResponse {
    id: number;
    name: string;
    email: string;
    password: string;
    birthDay: Date;
    createAt: Date;
    token: string;
}

export abstract class IQuery {
    users: User[];
}

export abstract class IMutation {
    createUser?: User;
    loginUser?: LoginResponse;
}

type Nullable<T> = T | null;
