import { INestApplication, Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

const db_url = process.env.DATABASE_URL;

@Injectable()
export class PrismaService extends PrismaClient {
  constructor() {
    super({
      datasources: {
        db: {
          url: db_url,
        },
      },
    });
  }

  // 👇 This function enable Shutdown Hooks ensures the application can gracefully shutdown. 👇
  // ----------------------------------------------------------------------------------------
  async enableShutdownHooks(app: INestApplication) {
    (this.$on as (event: string, listener: () => void) => void)(
      'beforeExit',
      async () => {
        await app.close();
      },
    );
  }
  // ----------------------------------------------------------------------------------------
}
