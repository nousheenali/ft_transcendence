import {
  Controller,
  Get,
  HttpStatus,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Request, Response } from 'express';
import { AccessTokenGuard } from './jwt/jwt.guard';
import { JwtAuthService } from './jwt/jwt.service';
import { User } from '@prisma/client';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private jwtAuthService: JwtAuthService,
  ) {}

//   @UseGuards(AccessTokenGuard)
  @Get('logout')
  async logout(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    try {
      const user = req.user as User;
      await this.jwtAuthService.removeCookie(res);
      await this.authService.logout(user, res);
      // res.redirect(`${process.env.NEXT_PUBLIC_GATEWAY_URL}`);
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  @UseGuards(AccessTokenGuard) // Assuming you have a guard that checks for valid JWT
  @Get('check')
  async checkAuth(@Req() req: Request, @Res() res: Response) {
    try {
      const user = await this.jwtAuthService.validateUser(req);
      return res.status(HttpStatus.OK).json(user);
    } catch (error) {
      return res
        .status(HttpStatus.UNAUTHORIZED)
        .json({ isAuthenticated: false });
    }
  }
}
