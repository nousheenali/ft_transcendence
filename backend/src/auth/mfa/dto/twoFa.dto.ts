import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class TwofaDto {
  @ApiProperty()
  @IsNotEmpty()
  userLogin: string;
}

export class TwofaVerifyDto {
  @ApiProperty()
  @IsNotEmpty()
  userLogin: string;
  @IsNotEmpty()
  token: string;
}
