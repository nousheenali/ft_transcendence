import { IsEmail, IsNotEmpty, IsOptional } from 'class-validator';
import { ApiProperty } from "@nestjs/swagger";

export class UpdateUserDto {
  @IsNotEmpty()
  login: string;

  @IsEmail()
  @IsOptional()
  email: string;

  @IsOptional()
  @ApiProperty()
  name: string;

  @ApiProperty()
  avatar: string
}