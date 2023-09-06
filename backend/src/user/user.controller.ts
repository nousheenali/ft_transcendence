import { Body, Controller, Get, Param, Post, Req, Res } from '@nestjs/common';
import { CreateUserDto } from './dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

    @Post('create')
    async createUser(@Res() res, @Body() dto: CreateUserDto) {

        const user = await this.userService.getUserById(dto.login_id);
        try {
          if (user) {
              res.status(200).json(user);
          } else {
              const newUser = await this.userService.createUser(dto);
              res.status(200).json(newUser);
          }
        } catch (error) {
            console.error('Error creating/getting user:', error);
            res.status(500).json();
        }
    }

    // @Get(':id')
    // getUserById(@Param('id') id: string) {
    //   console.log('User ID:', id);
    //   return this.userService.getUserById(id);
    // }
}
