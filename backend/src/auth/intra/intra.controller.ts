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

@Controller('auth/intra')
export class IntraController {
  constructor(
    private intraService: IntraService,
    private jwtAuthService: JwtAuthService,
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
      const tokens = await this.intraService.login(user);
      await this.jwtAuthService.setCookie(res, tokens);
      res.redirect(`${process.env.NEXT_PUBLIC_GATEWAY_URL}`);
    } catch (error) {
      if (!(error instanceof BadRequestException)) {
        throw new HttpException(
          'Unexpected error during login',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
      throw error;
    }
  }
}
