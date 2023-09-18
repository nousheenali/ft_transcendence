import { Body, Controller, Get, HttpException, HttpStatus, Param, Post, Res } from '@nestjs/common';
import { CreateUserDto } from './dto';
import { UserService } from './user.service';

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
            res.status(500).json(`Error creating user: ${error}`);
        }
    }

    //gets a single user information from user table 
    @Get(':id')
    getUserById(@Param('id') id: string) {
        try {
            return this.userService.getUserById(id);
        } catch (error) {
            throw new HttpException(
              'Error getting user',
              HttpStatus.BAD_REQUEST,
            );
        }
    }

    //gets all users except friends of the userId
    @Get('getAllNonFriends/:id')
    allNonFriends(@Param('id') id: string) {
        try {
            return this.userService.getAllNonFriends(id);
        } catch (error) {
            throw new HttpException(
              'Error getting users who are not friends',
              HttpStatus.BAD_REQUEST,
            );
        }
    }

}
