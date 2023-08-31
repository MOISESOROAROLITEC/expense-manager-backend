import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { GqlExecutionContext } from "@nestjs/graphql";
import { Request } from "express";
import { getUserByToken } from "src/shared/user-utilities";
import { UserInputError } from "@nestjs/apollo";
import { Reflector } from "@nestjs/core";
import { IS_PUBLIC_KEY } from "src/shared/decorators/public/public.decorator";

@Injectable()
export class UserGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.get(IS_PUBLIC_KEY, context.getHandler());
    if (isPublic) {
      return true;
    }

    const ctx = GqlExecutionContext.create(context);
    const request = ctx.getContext();
    const token = (request.req as Request).headers.authorization;
    const { status, message, user } = await getUserByToken(token);
    if (status !== 200) {
      throw new UserInputError(message);
    }
    request.user = user;
    return true;
  }
}
