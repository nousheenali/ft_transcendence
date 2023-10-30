import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Res,
} from '@nestjs/common';
import { CreateUserDto } from './dto';
import { UserService } from './user.service';
import { NotFoundError } from 'rxjs';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  //creates a user entry in the user table
  @Post('create')
  async createUser(@Res() res, @Body() dto: CreateUserDto) {
    const user = await this.userService.getUserByLogin(dto.login);
    try {
      if (user) {
        if (user.TFAEnabled === true) {
          await this.userService.setTFAVerificationRequired(user.login);
        }
        res.status(200).json(user);
      } else {
        const newUser = await this.userService.createUser(dto);
        res.status(200).json(newUser);
      }
    } catch (error) {
      res.status(500).json('Error creating user');
    }
  }

  //gets a single user information from user table using uuid
  @Get('getById/:id')
  getUserById(@Param('id') id: string) {
    try {
      return this.userService.getUserById(id);
    } catch (error) {
      throw new HttpException(
        'Unexpected Error getting user by ID',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  //gets a single user information from user table using uuid
  @Get('getByLogin/:login')
  async getUserByLogin(@Res() res, @Param('login') login: string) {
    try {

      const user = await this.userService.getUserByLogin(login);
      res.status(200).json(user);
      // return this.userService.getUserByLogin(login);
    } catch (error) {
      throw new HttpException(
        'Unexpected Error getting user by Login',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
