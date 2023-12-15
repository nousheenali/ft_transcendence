import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Length } from 'class-validator';

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
  @Length(6, 6, { message: 'Code should be 6 characters' })
  token: string;
}
