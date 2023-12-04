import { Module } from '@nestjs/common';
import { TwoFaController } from './two-fa.controller';
import { TwoFaService } from './two-fa.service';
import { UserModule } from 'src/user/user.module';
import { JwtAuthModule } from '../jwt/jwt.module';

@Module({
  imports: [UserModule, JwtAuthModule],
  controllers: [TwoFaController],
  providers: [TwoFaService],
})
export class TwoFaModule {}
