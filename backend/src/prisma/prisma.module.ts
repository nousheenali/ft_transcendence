import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Global()
@Module({
  providers: [PrismaService],
  exports: [PrismaService], // 👈 Export PrismaService so it can be used by other modules.
})
export class PrismaModule {}
