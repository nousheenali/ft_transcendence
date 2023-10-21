import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { ChannelModule } from './channel/channel.module';
import { FriendsModule } from './friends/friends.module';

import { TwoFaController } from './two-fa/two-fa.controller';
import { TwoFaModule } from './two-fa/two-fa.module';
// import { TModule } from './two-fa/two-fa.module';
// import { TwoFaController } from './two-fa/two-fa.controller';
// import { TwoFaModule } from './two-fa/two-fa.module';
// import { TwoFaController } from './two-fa/two-fa.controller';

@Module({
  imports: [PrismaModule, UserModule, ChannelModule, FriendsModule, TwoFaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
