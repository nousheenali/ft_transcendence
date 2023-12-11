import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as speakeasy from 'speakeasy';
import * as qrcode from 'qrcode';

@Injectable()
export class TwoFaService {
  constructor(private prisma: PrismaService) {}

  async generateSecret(login: string) {
    try {
      const secret = speakeasy.generateSecret({ length: 10 });
      await this.prisma.user.update({
        where: { login: login },
        // TOTP (Time-based One-time Password)
        // rquires the secret to be encoded in base 32 as specified in TOTP standard
        data: { TFAKey: secret.base32 },
      });
      return secret;
    } catch (error) {
      throw new BadRequestException('Unable to generate secret');
    }
  }
  async getQRCode(secret: { otpauth_url: string }) {
    const dataURL = await qrcode.toDataURL(secret.otpauth_url);
    return dataURL;
  }

  async verifyToken(login: string, token: string): Promise<boolean> {
    try {
      const user = await this.prisma.user.findUnique({
        where: { login: login },
      });

      if (!user || !user.TFAKey) {
        throw new BadRequestException('User not found or 2FA not set up.');
      }

      const isValid = speakeasy.totp.verify({
        secret: user.TFAKey,
        encoding: 'base32',
        token: token,
      });

      if (isValid) {
        await this.prisma.user.update({
          where: { login: login },
          data: { TFAEnabled: true },
        });

        if (user.TFAVerified === false && user.TFAEnabled === true) {
          await this.prisma.user.update({
            where: { login: login },
            data: { TFAVerified: true },
          });
        }
      }
      return isValid;
    } catch (error) {
      throw new BadRequestException('Unable to verify token.');
    }
  }

  async deactivateTwoFa(login: string, token: string) {
    try {
      return await this.prisma.user.update({
        where: { login: login },
        data: { TFAEnabled: false, TFAVerified: false },
      });
    } catch (error) {
      throw new BadRequestException('Unable to deactivate');
    }
  }
}
