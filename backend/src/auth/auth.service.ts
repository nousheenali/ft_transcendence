import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { Response } from 'express';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(private usersService: UserService) {}
  async logout(user: User, res: Response) {

    res.redirect('http://localhost:3000/login');
  }
}
