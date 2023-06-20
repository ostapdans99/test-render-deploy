import { IsNumber } from 'class-validator';

import { UserDto } from 'common/dto';

export class JwtDto {
  user: UserDto;

  @IsNumber()
  iat: number;

  @IsNumber()
  exp: number;
}
