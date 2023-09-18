import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto';

@Injectable()
export class UserService {
  
  constructor(private prisma: PrismaService) {}

  async createUser(dto: CreateUserDto) {
    try {
      const newUser = await this.prisma.user.create({
        data: {
          login: dto.login,
          email: dto.email,
          name: dto.name,
          avatar: dto.avatar,
        },
      });
      return newUser;
    } catch (error) {
      throw error;
    }
  }

  async getUserById(id: string) {

    const user = await this.prisma.user.findUnique({
      where: {
        login: id,
      },
    });
    return user;
  }

  async getAllNonFriends(id: string) {

    /*check if valid user*/
    const user = await this.getUserById(id);
    if(!user)
      throw new NotFoundException();

    /* Get all users that do not have a corresponding entry against the
    incoming userid in 'friendrelations' table */
    const usersWithoutFriendship = await this.prisma.user.findMany({
      where: {
        NOT: {
          OR: [
            {
              userToFriend: {
                some: {
                  friend: {
                    id: id,
                  },
                },
              },
            },
            {
              friendToUser: {
                some: {
                  user: {
                    id: id,
                  },
                },
              },
            },
          ],
        },
      },
    });

    /* The output above includes the incoming userid also, so removing that entry */
    const result = usersWithoutFriendship.filter((user) => user.id !== id);
    return result;
  }
  
}
