import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Res,
  Put,
  UploadedFile,
  UseInterceptors,
  Query,
} from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from './dto';
import { UserService } from './user.service';
import { NotFoundError } from 'rxjs';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { Response } from 'express';
import  * as path from "path";

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

  //updates user name
  @Put('update-name/:login')
  updateName(@Param('login') login: string, @Body() dto: UpdateUserDto) {
    return this.userService.updateName(login, dto.name);
  }

  @Post("/upload-avatar/:login")
  @UseInterceptors(FileInterceptor("file", {
    storage: diskStorage({
      destination: "./uploads",
      filename: (req, file, cb) => {
        cb(null, `${file.originalname}`);
      },
    }),
  }))
  async uploadFile(@Param('login')login: string, @UploadedFile() file: Express.Multer.File) {
    try {
      return await this.userService.getSavedFileURL(login, file);
    } catch (error) {
      console.error("Error uploading file:1", error);
      throw new HttpException("Error uploading file:2", HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // To Serve File
  @Get('/getFile')
  getFile(@Res() res: Response, @Query('avatar') avatar: string) {
    const filePath = path.join(__dirname, `../../../uploads/${avatar}`);
    res.sendFile(filePath);
  }
}