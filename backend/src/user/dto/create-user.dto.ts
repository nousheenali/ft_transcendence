import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  LOGIN_ID: string;

  @IsEmail()
  @IsNotEmpty()
  EMAIL: string;

  NAME: string;

  PROFILE_PIC: string;
}
