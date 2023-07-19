
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
    passeword: string;
    birthDay: Date;
}

export class User {
    id: number;
    name: string;
    email: string;
    passeword: string;
    birthDay: Date;
    createAt: Date;
}

export abstract class IQuery {
    users: User[];
}

export abstract class IMutation {
    createUser?: User;
}

type Nullable<T> = T | null;
