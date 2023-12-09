import { Injectable, Req, UnauthorizedException } from '@nestjs/common';

import { JwtService } from '@nestjs/jwt';
import { CookieOptions, Request, Response } from 'express';

import { User } from '@prisma/client';
import { AuthTokens, JwtPayload } from '../dto/jwt.dto';
import ms from 'ms';
import * as argon2 from 'argon2';
import { UserService } from 'src/user/user.service';
import * as cookie from 'cookie';
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
      httpOnly: true,
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

  private static getAccessTokenFromCookie(req: Request): string | null {
    const cookies = req.headers.cookie;

    if (!cookies) {
      return null;
    }

    const parsedCookies = cookie.parse(cookies);
    return parsedCookies.accessToken || null;
  }

  async validateUser(@Req() req: Request): Promise<User | null> {
    try {
      console.log(req.headers);
      const accessToken = JwtAuthService.getAccessTokenFromCookie(req);
      console.log(accessToken, 'accesstoken here');
      const payload: JwtPayload = this.jwtService.verify(accessToken, {
        secret: process.env.JWT_SECRET,
      });
      console.log(payload);
      const user = await this.userService.getUserByLogin(payload.login);
      console.log(user, 'user here');
      if (!user) {
        throw new UnauthorizedException('User not found');
      }

      return user;
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
