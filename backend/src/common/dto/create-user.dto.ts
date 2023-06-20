import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsString()
  readonly username: string;

  @IsEmail()
  readonly email: string;

  @MinLength(8)
  readonly password: string;

  @IsOptional()
  readonly isActivated?: boolean;
}
