import { Injectable, Req, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CookieOptions, Request, Response } from 'express';
import { User } from '@prisma/client';
import { AuthTokens, JwtPayload } from '../dto/jwt.dto';
import { UserService } from 'src/user/user.service';
import * as cookie from 'cookie';
import { Socket } from 'socket.io';
import { WsException } from '@nestjs/websockets';
@Injectable()
export class JwtAuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UserService,
  ) {}

  private generateCookiePayload(user: User) {
    delete user.TFAKey;
    delete user.createdAt;
    delete user.updatedAt;
    return user;
  }

  async generateJwt(user: User) {
    const payload = this.generateCookiePayload(user);
    const accessToken = this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET,
    });
    return {
      accessToken,
    };
  }

  private generateCookieOptions(): CookieOptions {
    const cookieOptions = {
      httpOnly: true,
    } as CookieOptions;
    return cookieOptions;
  }

  async removeCookie(res: Response) {
    const cookieOptions = this.generateCookieOptions();
    res.clearCookie('accessToken', cookieOptions);
  }

  async setCookie(res: Response, authToken: AuthTokens) {
    const cookieOptions = this.generateCookieOptions();
    res.cookie('accessToken', authToken.accessToken, {
      ...cookieOptions,
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
      const accessToken = JwtAuthService.getAccessTokenFromCookie(req);
      const payload: JwtPayload = this.jwtService.verify(accessToken, {
        secret: process.env.JWT_SECRET,
      });
      const user = await this.userService.getUserByLogin(payload.login);
      if (!user) {
        throw new UnauthorizedException('User not found');
      }
      return user;
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }

  async validateSocketConnection(client: Socket) {
    try {
      let token = client.handshake.headers.cookie;
      const cookies = cookie.parse(token);
      token = cookies.accessToken;
      const payload = this.jwtService.verify<any>(token, {
        secret: process.env.JWT_SECRET,
      });
      return this.userService.getUserByLogin(payload.login);
    } catch {
      return Promise.reject(new WsException('Token invalid or expired'));
    }
  }
}
