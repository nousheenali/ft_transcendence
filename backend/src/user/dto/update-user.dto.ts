import { IsNotEmpty, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsString, Length, Matches } from 'class-validator';

export class UpdateUserDto {
  @ApiProperty()
  @IsString()
  @Length(4, 20, { message: 'Name must be between 4 and 20 characters' })
  @Matches(/^[a-zA-Z0-9]+$/, {
    message: 'Name must contain only letters and numbers',
  })
  name?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  avatar?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  TFAKey?: string;

  @ApiProperty()
  @IsBoolean()
  @IsOptional()
  TFAEnabled?: boolean;
}
