import { IsEmail, IsNotEmpty, IsOptional } from 'class-validator';

export class UpdateUserDto {
  @IsNotEmpty()
  login: string;

  @IsEmail()
  @IsOptional()
  email: string;

  @IsOptional()
  name: string;

  @IsOptional()
  avatar: string;

  // wallpaper: string;
}