import { Body, Controller, Get, Param, Post, Req, Res } from '@nestjs/common';
import { CreateUserDto } from './dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

    // @Post('create')
    // async createUser(@Res() res, @Body() dto: CreateUserDto) {
    //     const user = await this.userService.getUserById(dto.LOGIN_ID);

    //     try {
    //     if (user) {
    //         console.log('found user');
    //         // console.log(user);
    //         res.status(200).json(user);
    //     } else {
    //         console.log('creating new user');
    //         const newUser = await this.userService.createUser(dto);
    //         // console.log(newUser);
    //         res.status(200).json(newUser);
    //     }
    //     } catch (error) {
    //         console.error('Error creating/getting user:', error);
    //         res.status(500).json({ message: 'Error creating/getting user' });
    //     }
    // }

    @Post('create')
    createUser(@Body() dto: CreateUserDto) {
      return this.userService.createUser(dto);
    }

    @Get(':id')
    getUserById(@Param('id') id: string) {
      console.log('User ID:', id);
      return this.userService.getUserById(id);
    }
}
