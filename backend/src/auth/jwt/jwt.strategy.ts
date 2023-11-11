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

@Injectable()
export class RefreshJwtStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  constructor(private usersService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        RefreshJwtStrategy.getRefreshTokenFromCookie,
        ExtractJwt.fromAuthHeaderAsBearerToken(),
      ]),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
      passReqToCallback: true,
    });
  }
  private hashsecret: string = process.env.HASH_SECRET;

  async validate(req: Request, payload: JwtPayload) {
    const refreshToken =
      RefreshJwtStrategy.extractRefreshJwtFromBearer(req) ??
      RefreshJwtStrategy.getRefreshTokenFromCookie(req);
    if (!refreshToken) {
      throw new UnauthorizedException('Session expired');
    }
    const user = await this.usersService.getUserByLogin(payload.sub);
    if (!user) {
      throw new UnauthorizedException('User not found');
    }
    const isValid = await argon2.verify(user.refreshToken, refreshToken, {
      secret: Buffer.from(this.hashsecret),
    });
    if (!isValid) {
      throw new UnauthorizedException('Session expired');
    }
    return user;
  }

  private static extractRefreshJwtFromBearer(req: Request): string | null {
    return req.get('Authorization')?.replace('Bearer', '').trim();
  }

  private static getRefreshTokenFromCookie(req: Request): string | null {
    return req.cookies?.refreshToken ?? null;
  }
}
