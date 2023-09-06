import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  login_id: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  name: string;

  profile_pic: string;
}
