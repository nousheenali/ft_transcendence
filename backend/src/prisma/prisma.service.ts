import { Injectable } from '@nestjs/common';
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
}
