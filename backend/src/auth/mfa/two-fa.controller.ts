import { Body, Controller, Post, Req, Res, UseGuards } from '@nestjs/common';
import { TwoFaService } from './two-fa.service';
import { TwofaDto, TwofaVerifyDto } from './dto/twoFa.dto';
import { HttpException, HttpStatus } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { JwtAuthService } from '../jwt/jwt.service';
import { Response } from 'express';
import { AccessTokenGuard } from '../jwt/jwt.guard';

@UseGuards(AccessTokenGuard)
@Controller('two-fa')
export class TwoFaController {
  constructor(
    private twoFaService: TwoFaService,
    private userService: UserService,
    private jwtAuthService: JwtAuthService,
  ) {}

  @Post('generateSecret')
  async generateSecret(@Body() dto: TwofaDto) {
    try {
      const secret: any = await this.twoFaService.generateSecret(dto.userLogin);
      const qrCodeUrl = await this.twoFaService.getQRCode(secret);
      return { qrCodeUrl };
    } catch (error) {
      throw new HttpException(
        'Unexpected Error while generating 2FA secret.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post('verify')
  async verifyToken(
    @Body() dto: TwofaVerifyDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    try {
      const isValid = await this.twoFaService.verifyToken(
        dto.userLogin,
        dto.token,
      );
      const user: any = await this.userService.getUserByLogin(dto.userLogin);
      console.log(user);
      const tokens = await this.jwtAuthService.generateJwt(user);
      console.log(tokens);
      return await this.jwtAuthService.storeTokensInCookie(res, tokens);
    } catch (error) {
      console.log(error);
      throw new HttpException(
        'Unexpected Error while verifying 2FA token.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post('deactivate')
  async deactivateTwoFa(
    @Body() dto: TwofaVerifyDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    try {
      const user = await this.twoFaService.deactivateTwoFa(
        dto.userLogin,
        dto.token,
      );
      console.log(user);
      const tokens = await this.jwtAuthService.generateJwt(user);
      console.log(tokens);
      return await this.jwtAuthService.storeTokensInCookie(res, tokens);
    } catch (error) {
      console.log(error);
      throw new HttpException(
        'Unexpected Error while verifying 2FA token.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
