import { IsEmail, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsString } from 'class-validator';

export class UpdateUserDto {
  @ApiProperty()
  @IsString()
  name?: string;

  @ApiProperty()
  @IsString()
  avatar?: string;

  @ApiProperty()
  @IsString()
  refreshToken?: string;

  @ApiProperty()
  @IsString()
  TFAKey?: string;

  @ApiProperty()
  @IsBoolean()
  TFAEnabled?: boolean;
}
