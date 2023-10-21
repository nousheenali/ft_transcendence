import { Body, Controller, Post, Req } from '@nestjs/common';
import { TwoFaService } from './two-fa.service';
import { TwofaDto, TwofaVerifyDto } from './dto/twoFa.dto';
import { HttpException, HttpStatus } from '@nestjs/common';

@Controller('two-fa')
export class TwoFaController {
  constructor(private twoFaService: TwoFaService) {}

  @Post('generateSecret')
  async generateSecret(@Body() dto: TwofaDto) {
    try {
      const secret = await this.twoFaService.generateSecret(dto.userLogin);
      const qrCodeUrl = await this.twoFaService.getQRCode(secret);
      // Remember to store the secret.base32 (or the entire secret object) in your database for later verification.
      return { qrCodeUrl };
    } catch (error) {
      throw new HttpException(
        'Unexpected Error while generating 2FA secret.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post('verify')
  async verifyToken(@Body() dto: TwofaVerifyDto) {
    try {
      const isValid = await this.twoFaService.verifyToken(
        dto.userLogin,
        dto.token,
      );
      return { isValid };
    } catch (error) {
      throw new HttpException(
        'Unexpected Error while verifying 2FA token.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
