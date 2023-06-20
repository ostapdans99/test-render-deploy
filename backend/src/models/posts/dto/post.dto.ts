import { IsString } from 'class-validator';

export class PostDto {
  @IsString()
  readonly content: string;
}
