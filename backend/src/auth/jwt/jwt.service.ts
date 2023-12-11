import { Injectable, UnauthorizedException } from '@nestjs/common';

import { JwtService } from '@nestjs/jwt';
import { CookieOptions, Response } from 'express';

import { User } from '@prisma/client';
import { AuthTokens, JwtPayload } from '../dto/jwt.dto';
import ms from 'ms';
import * as argon2 from 'argon2';
import { UserService } from 'src/user/user.service';

@Injectable()
export class JwtAuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UserService,
  ) {}

  // private accessTokenExpiration: string = '50m';

  private hashsecret: string = process.env.HASH_SECRET;

  private generatePayload(user: User, mfaAuthenticated = false) {
    return user;
  }

  async generateJwt(user: User, mfaAuthenticated = false) {
    const payload = this.generatePayload(user, mfaAuthenticated);
    const accessToken = this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET,
    });

    return {
      accessToken,
    };
  }

  private generateCookieOptions(): CookieOptions {
    const domain = 'localhost';
    const cookieOptions = {
      domain: domain,
      httpOnly: false,
    } as CookieOptions;
    return cookieOptions;
  }

  async removeTokensFromCookie(res: Response) {
    const cookieOptions = this.generateCookieOptions();
    res.clearCookie('accessToken', cookieOptions);
  }

  async storeTokensInCookie(res: Response, authToken: AuthTokens) {
    const cookieOptions = this.generateCookieOptions();
    res.cookie('accessToken', authToken.accessToken, {
      ...cookieOptions,
      // maxAge: ms(this.accessTokenExpiration),
    });
  }
}
