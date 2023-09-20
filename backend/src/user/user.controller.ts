import { Body, Controller, Get, HttpException, HttpStatus, Param, Post, Res } from '@nestjs/common';
import { CreateUserDto } from './dto';
import { UserService } from './user.service';
import { NotFoundError } from 'rxjs';

@Controller('user')
export class UserController {

    constructor(private userService: UserService) {}

    //creates a user entry in the user table
    @Post('create')
    async createUser(@Res() res, @Body() dto: CreateUserDto) {
        const user = await this.userService.getUserById(dto.login);
        try {
            if (user) {
                res.status(200).json(user);
            } else {
                const newUser = await this.userService.createUser(dto);
                res.status(200).json(newUser);
            }
        } catch (error) {
            res.status(500).json("Error creating user");
        }
    }

    //gets a single user information from user table 
    @Get(':id')
    getUserById(@Param('id') id: string) {
        try {
            return this.userService.getUserById(id);
        } catch (error) {
            if (error instanceof NotFoundError) {
              throw new HttpException(error.message, HttpStatus.NOT_FOUND);
            } else {
              throw new HttpException(
                'Unexpected Error getting user ID',
                HttpStatus.INTERNAL_SERVER_ERROR,
              );
            }
        }
    }
}
