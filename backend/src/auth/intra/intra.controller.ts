import {
  BadRequestException,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { IntraUserProfile } from '../dto/intra.dto';
import { intraOAuthGuard } from './intra.guard';
import { IntraService } from './intra.service';
import { JwtAuthService } from '../jwt/jwt.service';
import { RoomsService } from 'src/chat/rooms.service';
import { ChatService } from 'src/chat/chat.service';

@Controller('auth/intra')
export class IntraController {
  constructor(
    private intraService: IntraService,
    private jwtAuthService: JwtAuthService,
    private roomService: RoomsService,
    private chatService: ChatService,
  ) {}

  /** ================================================================================================
   * 🟣🟣 // this route is just for redirecting to intra oauth
   * ================================================================================================*/
  @UseGuards(intraOAuthGuard)
  @Get()
  async intraOAuth() {}

  @UseGuards(intraOAuthGuard)
  @Get('callback')
  async intraOAuthCallback(@Req() req: Request, @Res() res: Response) {
    try {
      const user = req.user as IntraUserProfile;
      const userOnline = await this.chatService.getUserStaus(user?.login);
      if (userOnline?.isOnline && userOnline?.isOnline === true) {
        res.redirect(
          `${process.env.NEXT_PUBLIC_GATEWAY_URL}/login?duplicateLogin=true`,
        );
        return;
        // throw new BadRequestException('Already Logged In');
      }
      const tokens = await this.intraService.login(user);
      await this.jwtAuthService.setCookie(res, tokens);
      if (userOnline) {
        res.redirect(`${process.env.NEXT_PUBLIC_GATEWAY_URL}`);
      } else {
        res.redirect(`${process.env.NEXT_PUBLIC_GATEWAY_URL}/settings`);
      }
    } catch (error) {
      if (!(error instanceof BadRequestException)) {
        console.log(error);
        throw new HttpException(
          'Unexpected error during login',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
      throw error;
    }
  }
}
