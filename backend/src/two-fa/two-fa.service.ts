import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as speakeasy from 'speakeasy';
import * as qrcode from 'qrcode';

@Injectable()
export class TwoFaService {
  constructor(private prisma: PrismaService) {}

  async generateSecret() {
    try {
      return speakeasy.generateSecret({ length: 10 });
    } catch (error) {
      throw new BadRequestException('Unable to generate secret');
    }
  }
  async getQRCode(secret: { otpauth_url: string }) {
    const dataURL = await qrcode.toDataURL(secret.otpauth_url);
    return dataURL;
  }
}
