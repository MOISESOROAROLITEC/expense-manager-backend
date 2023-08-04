import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { PrismaClient } from '@prisma/client';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { getUserByToken } from 'src/shared/user-utilities';


@Injectable()
export class AdminGuard implements CanActivate {
  
   canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const ctx = GqlExecutionContext.create(context)
    const request = ctx.getContext()
    const token = (request.req as Request).headers.authorization
    return false;
  }
}
