import {
  BadRequestException,
  Body,
  Controller,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
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
      if (!(error instanceof BadRequestException)) {
        throw new HttpException(
          'Unexpected Error while generating 2FA secret.',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
      throw error;
    }
  }

  @Post('verify')
  async verifyToken(
    @Body() dto: TwofaVerifyDto,
    @Res() res: Response,
  ) {
    try {
      const isValid = await this.twoFaService.verifyToken(
        dto.userLogin,
        // token generated from the google authneticator app
        dto.token,
      );
      if (!isValid) {
        throw new BadRequestException('Token is not valid');
      }
      const user: any = await this.userService.getUserByLogin(dto.userLogin);
      // console.log(user);
      const tokens = await this.jwtAuthService.generateJwt(user);
      // console.log(tokens);
      await this.jwtAuthService.setCookie(res, tokens);
      return res.send({ user });
    } catch (error) {
      console.log(error);
      if (!(error instanceof BadRequestException)) {
        throw new HttpException(
          'Unexpected error during 2FA verification.',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
      throw error; // Re-throw the BadRequestException for invalid tokens
    }
  }

  @Post('deactivate')
  async deactivateTwoFa(
    @Body() dto: TwofaVerifyDto,
    @Res() res: Response,
  ) {
    try {
      const user = await this.twoFaService.deactivateTwoFa(
        dto.userLogin,
        dto.token,
      );
      console.log(user);
      const tokens = await this.jwtAuthService.generateJwt(user);
      console.log(tokens);
      await this.jwtAuthService.setCookie(res, tokens);
      res.send({ user });
    } catch (error) {
      console.log(error);
      if (!(error instanceof BadRequestException)) {
        throw new HttpException(
          'Unexpected error during deactivation',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
      throw error;
    }
  }
}
