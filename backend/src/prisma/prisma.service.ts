import { INestApplication, Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

// 👇 This function enable Shutdown Hooks ensures the application can gracefully shutdown. 👇
// ----------------------------------------------------------------------------------------
@Injectable()
export class PrismaService extends PrismaClient {
  async enableShutdownHooks(app: INestApplication) {
    (this.$on as (event: string, listener: () => void) => void)('beforeExit', async () => {
		await app.close();
    });
  }
}
// ----------------------------------------------------------------------------------------