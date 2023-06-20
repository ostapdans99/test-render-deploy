import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { ObjectId } from 'mongoose';

export const GetUserId = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext): ObjectId => {
    const request = ctx.switchToHttp().getRequest();
    const userId = request.user['_id'];

    return userId;
  },
);
