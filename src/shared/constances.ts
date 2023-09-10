export enum accountTypeEnum {
  "Bank",
  "Bourse",
  "BoxMoney",
}

export enum transactionTypeEnum {
  "Debit",
  "Credit",
}

export const emailValidateRegExp: RegExp = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

export const phoneValidateRegExp: RegExp =
  /^(?:\+\d{1,3})?(?:\(\d{1,4}\)|\d{1,4})\d{1,10}\d{1,10}\d{1,10}$/;
