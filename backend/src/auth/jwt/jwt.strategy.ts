import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt } from 'passport-jwt';
import { Strategy } from 'passport-jwt';
import * as cookie from 'cookie';
import { UserService } from 'src/user/user.service';
import { JwtPayload } from '../dto/jwt.dto';

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
    const cookies = req.headers.cookie;
    if (!cookies) {
      return null;
    }
    const parsedCookies = cookie.parse(cookies);
    return parsedCookies.accessToken || null;
  }

  async validate(payload: JwtPayload) {
    try {
      const user = await this.userService.getUserByLogin(payload.login);
      if (!user) {
        throw new UnauthorizedException('User not found');
      }
      return user;
    } catch (error) {
      throw new UnauthorizedException('Unauthorized', 'Invalid credentials');
    }
  }
}
