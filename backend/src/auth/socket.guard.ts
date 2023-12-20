import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { Socket } from 'socket.io';
import * as cookie from 'cookie';

// import { CookieService } from 'src/cookie/cookie.service';
// import { LoggedStrategyJWT } from '../passport/jwt.logged.strategy';
@Injectable()
export class SocketAuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}
  // The canActivate method is called to determine if a request is authorized
  async canActivate(context: ExecutionContext): Promise<boolean> {
    // Extracting the WebSocket client from the ExecutionContext
    // switching to wscontext makes the ws-sepcific methods and properties available
    const client: Socket = context.switchToWs().getClient();
    const handshake = client.handshake;
    let cookies = handshake.headers.cookie;
    const token = cookie.parse(cookies).accessToken || null;
    try {
      const payload = await this.jwtService.verify(token, {
        secret: process.env.JWT_SECRET,
      });
      // Attach the user payload to the socket object for later use
      // client.user = payload;
      return true;
    } catch (err) {
      console.log('Token failed to authorize: ', err);
      client.disconnect();
      return false;
    }
  }
}
