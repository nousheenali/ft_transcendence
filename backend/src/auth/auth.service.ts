import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { Response } from 'express';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(private usersService: UserService) {}
  async logout(user: User, res: Response) {
    await this.usersService.update(user.login, { refreshToken: null });
    res.redirect('http://10.11.3.8:3000/login');
  }
}
