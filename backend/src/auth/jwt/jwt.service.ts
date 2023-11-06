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

  private accessTokenExpiration: string = '15m';

  private refreshTokenExpiration: string = '7d';

  private hashsecret: string = process.env.HASH_SECRET;

  private generatePayload(user: User, mfaAuthenticated = false) {
    return {
      sub: user.login,
      email: user.email,
      mfaEnabled: user.TFAEnabled,
      mfaAuthenticated: mfaAuthenticated,
    } as JwtPayload;
  }

  private async updateRefreshToken(user: User, refreshToken: string) {
    const hash = await argon2.hash(refreshToken, {
      secret: Buffer.from(this.hashsecret),
    });

    await this.userService.update(user.login, {
      refreshToken: hash,
    });
  }

  async generateJwt(user: User, mfaAuthenticated = false) {
    const payload = this.generatePayload(user, mfaAuthenticated);
    const accessToken = this.jwtService.sign(payload, {
      expiresIn: this.accessTokenExpiration,
      secret: process.env.JWT_SECRET,
    });
    const refreshToken = this.jwtService.sign(payload, {
      expiresIn: this.refreshTokenExpiration,
      secret: process.env.JWT_SECRET,
    });
    await this.updateRefreshToken(user, refreshToken);
    return {
      accessToken,
      refreshToken,
    };
  }

  private generateCookieOptions(): CookieOptions {
    const domain = 'localhost';
    const cookieOptions = {
      domain: domain,
      httpOnly: false,
      sameSite: 'lax',
      secure: domain !== 'localhost',
    } as CookieOptions;
    return cookieOptions;
  }

  async removeTokensFromCookie(res: Response) {
    const cookieOptions = this.generateCookieOptions();
    res.clearCookie('accessToken', cookieOptions);
    res.clearCookie('refreshToken', cookieOptions);
  }

  async storeTokensInCookie(res: Response, authToken: AuthTokens) {
    const cookieOptions = this.generateCookieOptions();
    res.cookie('accessToken', authToken.accessToken, {
      ...cookieOptions,
      maxAge: ms(this.accessTokenExpiration),
    });
    res.cookie('refreshToken', authToken.refreshToken, {
      ...cookieOptions,
      maxAge: ms(this.refreshTokenExpiration),
    });
  }

  async refreshJwt(login: string) {
    const user = await this.userService.getUserByLogin(login);
    if (!user) {
      throw new UnauthorizedException('User not found');
    }
    if (!user.refreshToken) {
      throw new UnauthorizedException('Session expired');
    }
    return await this.generateJwt(user);
  }
}
