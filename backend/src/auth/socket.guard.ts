import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { Socket } from 'socket.io';

// import { CookieService } from 'src/cookie/cookie.service';
// import { LoggedStrategyJWT } from '../passport/jwt.logged.strategy';
@Injectable()
export class SocketAuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const client: Socket = context.switchToWs().getClient();
    const handshake = client.handshake;
    let token = handshake.headers.cookie;
    const [name, value] = token.trim().split('=');
    console.log(value, 'value herere');
    try {
      const payload = await this.jwtService.verify(value, {
        secret: process.env.JWT_SECRET,
      });
      console.log(payload, 'verified');
      // Attach the user payload to the socket object for later use
      //   client.user = payload;
      return true;
    } catch (err) {
      console.log('Token failed to authorize: ', err);
      client.disconnect();
      return false;
    }
  }
}
