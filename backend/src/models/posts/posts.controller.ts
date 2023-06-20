import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { Types } from 'mongoose';

import { AccessJwtAuthGuard, RefreshJwtAuthGuard } from 'common/guards';
import { ROUTES, SUBROUTES } from 'common/constants';
import { GetPostsQuery, GetUserId } from 'common/decorators';
import { PostsDto } from 'common/dto';
import { generateResponseError } from 'common/utils';

import { PostDto } from './dto';
import { PostsService } from './posts.service';

@Controller(ROUTES.POSTS)
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  @UseGuards(AccessJwtAuthGuard, RefreshJwtAuthGuard)
  async getPosts(@GetPostsQuery() postsDto: PostsDto) {
    try {
      return await this.postsService.getPosts(postsDto);
    } catch (error) {
      generateResponseError(error);
    }
  }

  @Get(SUBROUTES.GET_FAVORITES_POSTS)
  @UseGuards(AccessJwtAuthGuard, RefreshJwtAuthGuard)
  async getFavoritesPosts(
    @GetPostsQuery() postsDto: PostsDto,
    @GetUserId() userId: Types.ObjectId,
  ) {
    try {
      const { page, limit } = postsDto;

      return await this.postsService.getFavoritesPosts({ userId, page, limit });
    } catch (error) {
      generateResponseError(error);
    }
  }

  @Get(SUBROUTES.GET_POST)
  @UseGuards(AccessJwtAuthGuard, RefreshJwtAuthGuard)
  async getPost(@Param('postId') postId: string) {
    try {
      return await this.postsService.getPostById(postId);
    } catch (error) {
      generateResponseError(error);
    }
  }

  @Post()
  @UseGuards(AccessJwtAuthGuard, RefreshJwtAuthGuard)
  async createPost(@Body() body: PostDto, @GetUserId() userId: Types.ObjectId) {
    try {
      const { content } = body;

      return await this.postsService.createPost({ content, author: userId });
    } catch (error) {
      generateResponseError(error);
    }
  }

  @Delete(SUBROUTES.DELETE_POST)
  @UseGuards(AccessJwtAuthGuard, RefreshJwtAuthGuard)
  async deletePost(
    @Param('postId') postId: string,
    @GetUserId() userId: Types.ObjectId,
  ) {
    try {
      return await this.postsService.deletePostById({ userId, postId });
    } catch (error) {
      generateResponseError(error);
    }
  }

  @Patch(SUBROUTES.UPDATE_POST)
  @UseGuards(AccessJwtAuthGuard, RefreshJwtAuthGuard)
  async updatePost(
    @Body() body: PostDto,
    @Param('postId') postId: string,
    @GetUserId() userId: Types.ObjectId,
  ) {
    try {
      const { content } = body;

      return await this.postsService.updatePost({ userId, postId, content });
    } catch (error) {
      generateResponseError(error);
    }
  }

  @Patch(SUBROUTES.TOGGLE_FAVORITE)
  @UseGuards(AccessJwtAuthGuard, RefreshJwtAuthGuard)
  async toggleFavorite(
    @Param('postId') postId: string,
    @GetUserId() userId: Types.ObjectId,
  ) {
    try {
      return await this.postsService.toggleFavorite({ userId, postId });
    } catch (error) {
      generateResponseError(error);
    }
  }
}
