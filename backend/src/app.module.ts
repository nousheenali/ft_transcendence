import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { ChannelModule } from './channel/channel.module';
import { FriendsModule } from './friends/friends.module';
import { 2faModule } from './2fa/2fa.module';
import { TwoFaController } from './two-fa/two-fa.controller';
import { TwoFaModule } from './two-fa/two-fa.module';
import { TwoFaController } from './two-fa/two-fa.controller';

@Module({
  imports: [PrismaModule, UserModule, ChannelModule, FriendsModule, 2faModule, TwoFaModule],
  controllers: [AppController, TwoFaController],
  providers: [AppService],
})
export class AppModule {}
