import { Module } from "@nestjs/common";
import { UserService } from "./user.service";
import { UserResolver } from "./user.resolver";
import { TrransactionsFieldsResolver } from "./fields/trransactions-fields/trransactions-fields.resolver";

@Module({
  providers: [UserService, UserResolver, TrransactionsFieldsResolver],
})
export class UserModule {}
