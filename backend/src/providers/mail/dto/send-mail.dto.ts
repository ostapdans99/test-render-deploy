import { IsEmail, IsString } from 'class-validator';

export class SendMailDto {
  @IsEmail()
  readonly email: string;

  @IsString()
  readonly link: string;

  @IsString()
  readonly mailTitle: string;

  @IsString()
  readonly mailContentTitle: string;
}
