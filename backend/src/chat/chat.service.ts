import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ChatService {
  constructor(private prisma: PrismaService) {}

  /** ================================================================================================
   * ❂➤ Updating the user status in the database
   * ================================================================================================*/
  async updateUserStatus(login: string, isOnline: boolean) {
    await this.prisma.user.update({
      where: { login: login },
      data: { isOnline: isOnline },
    });
  }

  /** ================================================================================================
   * ❂➤ Getting all the users from the database
   * ================================================================================================*/
}
