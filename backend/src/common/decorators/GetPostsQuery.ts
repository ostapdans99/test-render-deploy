import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { Types } from 'mongoose';

import { PostsDto } from 'common/dto';

export const GetPostsQuery = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext): PostsDto => {
    const request = ctx.switchToHttp().getRequest();
    const query = request.query;

    const page = Number(query.page) || 1;
    const limit = Number(query.limit) || 10;
    const userId = query.userId;

    const postsDto = {
      page,
      limit,
      ...(userId && { userId: new Types.ObjectId(userId) }),
    };

    return postsDto;
  },
);
