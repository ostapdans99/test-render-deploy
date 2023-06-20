import { IsString, MinLength } from 'class-validator';

export class ChangePasswordDto {
  @IsString()
  readonly token: string;

  @MinLength(8)
  readonly password: string;
}
