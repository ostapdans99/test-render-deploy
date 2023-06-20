import { IsBoolean, IsEmail, IsString } from 'class-validator';

export class UserDto {
  @IsString()
  readonly _id: string;

  @IsString()
  readonly username: string;

  @IsString()
  readonly avatar: string;

  @IsString()
  readonly status: string;

  @IsEmail()
  readonly email: string;

  @IsBoolean()
  readonly isActivated: boolean;
}
