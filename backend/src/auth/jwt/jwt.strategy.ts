import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt } from 'passport-jwt';
import { Strategy } from 'passport-jwt';

import { JwtPayload } from '../dto/jwt.dto';
import * as argon2 from 'argon2';
import { UserService } from 'src/user/user.service';

@Injectable()
export class JwtAuthStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        JwtAuthStrategy.getAccessTokenFromCookie,
        ExtractJwt.fromAuthHeaderAsBearerToken(),
      ]),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  private static getAccessTokenFromCookie(req: Request): string | null {
    const cookieHeader = req.headers.cookie;

    if (cookieHeader) {
      const cookies: any = cookieHeader.split(';').reduce((acc, cookie) => {
        const [name, value] = cookie.trim().split('=');
        acc[name] = value;
        return acc;
      }, {});

      return cookies.accessToken ?? null;
    }

    return null;
  }

  async validate(payload: JwtPayload) {
    try {
      // console.log('JwtAuthStrategy - Validate - Payload:', payload);

      const user = await this.userService.getUserByLogin(payload.login);

      if (!user) {
        // console.log('JwtAuthStrategy - Validate - User not found');
        throw new UnauthorizedException('User not found');
      }

      // console.log('JwtAuthStrategy - Validate - User:', user);
      return user;
    } catch (error) {
      // console.error('JwtAuthStrategy - Validate - Error:', error);
      throw new UnauthorizedException('Unauthorized', 'Invalid credentials');
    }
  }
}

