import { IsOptional, MaxLength } from 'class-validator';
import { Types } from 'mongoose';

export class ChangeStatusDto {
  @IsOptional()
  readonly userId?: Types.ObjectId;

  @MaxLength(100)
  readonly status: string;
}
