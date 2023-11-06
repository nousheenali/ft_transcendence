import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
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

  @UseGuards(intraOAuthGuard)
  @Get()
  async intraOAuth() {
    // this route is just for redirecting to intra oauth
  }

  @UseGuards(intraOAuthGuard)
  @Get('callback')
  async intraOAuthCallback(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    try {
      const user = req.user as IntraUserProfile;
      console.log(user);
      const tokens = await this.intraService.login(user);
      await this.jwtAuthService.storeTokensInCookie(res, tokens);
      res.redirect(`http://localhost:3000/`);
    } catch (error) {
      console.log(req);
      console.log(error);
      return error;
    }
  }
}
