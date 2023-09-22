import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class FriendsDto {
  @ApiProperty()
  @IsNotEmpty()
  userLogin: string;

  @ApiProperty()
  @IsNotEmpty()
  friendLogin: string;
}
