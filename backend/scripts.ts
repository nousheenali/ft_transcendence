import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

//================================================================================================================
// Testing the Channels and the channels members.

async function main() {
  //================================================================================================================
  // Delete all data from the DataBase at the beginning to avoid any errors.

  /**
   * **NOTE:**
   * **We delete the channel relation at the beginning to avoid any errors,
   * **because the channel relation has a foreign key to the channel and the user,
   * **so if we delete the channel first, an error will rise.
   * **The same thing with the user, if we delete the user first, an error will rise.
   * **So we delete the channel relation first, then the channel, then the user.
   * **The same thing with the friend relation, we delete it first, then the user.
   */
  await prisma.channelRelation.deleteMany();
  await prisma.channel.deleteMany();
  await prisma.friendRelation.deleteMany();
  await prisma.messages.deleteMany();
  await prisma.user.deleteMany();

  //================================================================================================================
  const gabdoush = await prisma.user.create({
    data: {
      login: 'gabdoush',
      email: 'gabdoush@hotmail.com',
      name: 'Ghaiath Abdoush',
      isOnline: true,
      score: 120,
    },
  });
  //================================================================================================================
  const createUsers = async (numberOfUsers: any) => {
    const users = [];

    for (let i = 0; i < numberOfUsers; i++) {
      const newUser = await prisma.user.create({
        data: {
          login: `user_${i}`,
          email: `user_${i}@example.com`,
          name: `User ${i}`,
          isOnline: true,
          score: 120,
        },
      });
      users.push(newUser);
    }

    return users;
  };

  //================================================================================================================
  const createChannels = async (users, numberOfChannels, channelType) => {
    const channels = [];

    for (let i = 0; i < numberOfChannels; i++) {
      const creatorIndex = i % users.length;
      const creator = users[creatorIndex];

      const newChannel = await prisma.channel.create({
        data: {
          channelName: `Ch-${i}-${channelType}`,
          channelType: channelType,
          createdBy: creator.id,
          channelMembers: {
            create: {
              userId: creator.id,
            },
          },
        },
      });

      channels.push(newChannel);
    }

    return channels;
  };

  //================================================================================================================
  const createChannelUserRelations = async (channels) => {
    for (const channel of channels) {
        await prisma.channelRelation.create({
          data: {
            channelId: channel.id,
            userId: gabdoush.id,
          }
        })
      }
    };

  //================================================================================================================
  const users = await createUsers(100);
  const privateChannels = await createChannels(users, 20, 'PRIVATE');
  const publicChannels = await createChannels(users, 20, 'PUBLIC');
  await createChannelUserRelations(privateChannels);
  
  //================================================================================================================
  console.log('-------------------------------------------------------------');
  //================================================================================================================
  const AbuDhabi = await prisma.channel.create({
    data: {
      channelName: 'AbuDhabi',
      channelType: 'PUBLIC',
      createdBy: gabdoush.id,
      channelMembers: {
        create: {
          userId: gabdoush.id,
        },
      },
    },
  });
  //------------------------------------------------
  const FourTwo = await prisma.channel.create({
    data: {
      channelName: 'FourTwo',
      channelType: 'PRIVATE',
      createdBy: gabdoush.id,
      channelMembers: {
        create: {
          userId: gabdoush.id,
        },
      },
    },
  });
  //------------------------------------------------
  const TwoFour = await prisma.channel.create({
    data: {
      channelName: 'TwoFour',
      channelType: 'PRIVATE',
      createdBy: gabdoush.id,
      channelMembers: {
        create: {
          userId: gabdoush.id,
        },
      },
    },
  });
  //------------------------------------------------
  const Dubai = await prisma.channel.create({
    data: {
      channelName: '42 Dubai',
      channelType: 'PRIVATE',
      createdBy: gabdoush.id,
      channelMembers: {
        create: {
          userId: gabdoush.id,
        },
      },
    },
  });
  //------------------------------------------------
  const Sharjah = await prisma.channel.create({
    data: {
      channelName: 'Sharjah',
      channelType: 'PRIVATE',
      createdBy: gabdoush.id,
      channelMembers: {
        create: {
          userId: gabdoush.id,
        },
      },
    },
  });
  //------------------------------------------------
  const ourTeam = await prisma.channel.create({
    data: {
      channelName: 'ourTeam',
      channelType: 'PRIVATE',
      createdBy: gabdoush.id,
      channelMembers: {
        create: {
          userId: gabdoush.id,
        },
      },
    },
  });
  
  //================================================================================================================
  // await prisma.messages.create({
  //   data: {
  //     senderId: samad.id,
  //     receiverId: gabdoush.id,
  //     content: 'Hello gabdoush1 from samad, how are you....?',
  //   },
  // });


  // await prisma.messages.create({
  //   data: {
  //     senderId: samad.id,
  //     channelId: AbuDhabi.id,
  //     content: 'Hello Yonatan, how are you?',
  //   },
  // });
  //================================================================================================================
}

main()
  .catch((e) => console.error(e.message))
  .finally(async () => await prisma.$disconnect());
