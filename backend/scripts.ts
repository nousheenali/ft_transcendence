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
  //------------------------------------------------
  const yonatan = await prisma.user.create({
    data: {
      login: 'yonatan',
      email: 'yonatan@hotmail.com',
      name: 'Yonathan Monges',
      isOnline: false,
      score: 120,
    },
  });
  //------------------------------------------------
  const samad = await prisma.user.create({
    data: {
      login: 'samad',
      email: 'samad@hotmail.com',
      name: 'Samad Abdul',
      isOnline: false,
      score: 122,
    },
  });
  //------------------------------------------------
  const taro = await prisma.user.create({
    data: {
      login: 'Taro',
      email: 'taro@hotmail.com',
      name: 'Taro Abdul',
      isOnline: false,
      score: 122,
    },
  });
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
  // Adding channelRelation between the users to the channel.

  await prisma.channelRelation.create({
    data: {
      channelId: Dubai.id,
      userId: yonatan.id,
    },
  });
  //------------------------------------------------
  await prisma.channelRelation.create({
    data: {
      channelId: AbuDhabi.id,
      userId: samad.id,
    },
  });
  //------------------------------------------------
  await prisma.channelRelation.create({
    data: {
      channelId: AbuDhabi.id,
      userId: yonatan.id,
    },
  });
  //================================================================================================================
  await prisma.messages.create({
    data: {
      senderId: samad.id,
      receiverId: gabdoush.id,
      content: 'Hello gabdoush1 from samad, how are you....?',
    },
  });
  await prisma.messages.create({
    data: {
      senderId: samad.id,
      receiverId: gabdoush.id,
      content: 'Hello gabdoush2 from samad, how are?........',
    },
  });
  await prisma.messages.create({
    data: {
      senderId: samad.id,
      receiverId: gabdoush.id,
      content: 'Hello gabdoush3 from samad, how.............',
    },
  });

  await prisma.messages.create({
    data: {
      senderId: yonatan.id,
      receiverId: gabdoush.id,
      content: 'Hello gabdoush1 from yonatan, how are you---',
    },
  });
  await prisma.messages.create({
    data: {
      senderId: yonatan.id,
      receiverId: gabdoush.id,
      content: 'Hello gabdoush2 from yonatan, how are--------',
    },
  });
  await prisma.messages.create({
    data: {
      senderId: yonatan.id,
      receiverId: gabdoush.id,
      content: 'Hello gabdoush3 from yonatan, how----------------',
    },
  });
  await prisma.messages.create({
    data: {
      senderId: taro.id,
      receiverId: gabdoush.id,
      content: 'Hello gabdoush2 from taro, how are--------',
    },
  });
  await prisma.messages.create({
    data: {
      senderId: taro.id,
      receiverId: gabdoush.id,
      content: 'Hello gabdoush3 from taro, how----------------',
    },
  });
  //================================================================================================================
  await prisma.messages.create({
    data: {
      senderId: samad.id,
      channelId: AbuDhabi.id,
      content: 'Hello Yonatan, how are you?',
    },
  });
  await prisma.messages.create({
    data: {
      senderId: samad.id,
      channelId: AbuDhabi.id,
      content: 'Hello Gabdoush, I am fine, how are you?',
    },
  });
  await prisma.messages.create({
    data: {
      senderId: gabdoush.id,
      channelId: AbuDhabi.id,
      content: 'everything is fine',
    },
  });
  await prisma.messages.create({
    data: {
      senderId: yonatan.id,
      channelId: AbuDhabi.id,
      content: 'yes, everything is fine',
    },
  });
  await prisma.messages.create({
    data: {
      senderId: gabdoush.id,
      channelId: AbuDhabi.id,
      content: 'Hello Abudhabi',
    },
  });
  await prisma.messages.create({
    data: {
      senderId: yonatan.id,
      channelId: AbuDhabi.id,
      content: 'Hello Abudhabi',
    },
  });
  await prisma.messages.create({
    data: {
      senderId: gabdoush.id,
      channelId: AbuDhabi.id,
      content: 'Hello Yonatan, how are you?',
    },
  });
  await prisma.messages.create({
    data: {
      senderId: yonatan.id,
      channelId: AbuDhabi.id,
      content: 'Hello Gabdoush, I am fine, how are you?',
    },
  });
  await prisma.messages.create({
    data: {
      senderId: gabdoush.id,
      channelId: AbuDhabi.id,
      content: 'everything is fine',
    },
  });
  await prisma.messages.create({
    data: {
      senderId: samad.id,
      channelId: AbuDhabi.id,
      content: 'yes, everything is fine',
    },
  });
  await prisma.messages.create({
    data: {
      senderId: gabdoush.id,
      channelId: AbuDhabi.id,
      content: 'Hello Abudhabi',
    },
  });
  await prisma.messages.create({
    data: {
      senderId: yonatan.id,
      channelId: AbuDhabi.id,
      content: 'Hello Abudhabi',
    },
  });
  await prisma.messages.create({
    data: {
      senderId: gabdoush.id,
      channelId: AbuDhabi.id,
      content: 'Hello Yonatan, how are you?',
    },
  });
  await prisma.messages.create({
    data: {
      senderId: yonatan.id,
      channelId: AbuDhabi.id,
      content: 'Hello Gabdoush, I am fine, how are you?',
    },
  });
  await prisma.messages.create({
    data: {
      senderId: gabdoush.id,
      channelId: AbuDhabi.id,
      content: 'everything is fine',
    },
  });
  await prisma.messages.create({
    data: {
      senderId: yonatan.id,
      channelId: AbuDhabi.id,
      content: 'yes, everything is fine',
    },
  });
  await prisma.messages.create({
    data: {
      senderId: samad.id,
      channelId: AbuDhabi.id,
      content: 'Hello Abudhabi',
    },
  });
  await prisma.messages.create({
    data: {
      senderId: yonatan.id,
      channelId: AbuDhabi.id,
      content: 'Hello Abudhabi',
    },
  });
  await prisma.messages.create({
    data: {
      senderId: samad.id,
      channelId: AbuDhabi.id,
      content: 'Hello Yonatan, how are you?',
    },
  });
  await prisma.messages.create({
    data: {
      senderId: samad.id,
      channelId: AbuDhabi.id,
      content: 'Hello Gabdoush, I am fine, how are you?',
    },
  });
  await prisma.messages.create({
    data: {
      senderId: gabdoush.id,
      channelId: AbuDhabi.id,
      content: 'everything is fine',
    },
  });
  await prisma.messages.create({
    data: {
      senderId: samad.id,
      channelId: AbuDhabi.id,
      content: 'yes, everything is fine',
    },
  });
  await prisma.messages.create({
    data: {
      senderId: gabdoush.id,
      channelId: AbuDhabi.id,
      content: 'Hello Abudhabi',
    },
  });
  await prisma.messages.create({
    data: {
      senderId: yonatan.id,
      channelId: AbuDhabi.id,
      content: 'Hello Abudhabi',
    },
  });
  await prisma.messages.create({
    data: {
      senderId: gabdoush.id,
      channelId: AbuDhabi.id,
      content: 'Hello Yonatan, how are you?',
    },
  });
  await prisma.messages.create({
    data: {
      senderId: yonatan.id,
      channelId: AbuDhabi.id,
      content: 'Hello Gabdoush, I am fine, how are you?',
    },
  });
  await prisma.messages.create({
    data: {
      senderId: gabdoush.id,
      channelId: AbuDhabi.id,
      content: 'everything is fine',
    },
  });
  await prisma.messages.create({
    data: {
      senderId: yonatan.id,
      channelId: AbuDhabi.id,
      content: 'yes, everything is fine',
    },
  });
  await prisma.messages.create({
    data: {
      senderId: gabdoush.id,
      channelId: AbuDhabi.id,
      content: 'Hello Abudhabi',
    },
  });
  await prisma.messages.create({
    data: {
      senderId: yonatan.id,
      channelId: AbuDhabi.id,
      content: 'Hello Abudhabi',
    },
  });
  await prisma.messages.create({
    data: {
      senderId: samad.id,
      channelId: AbuDhabi.id,
      content: 'Hello Yonatan, how are you?',
    },
  });
  await prisma.messages.create({
    data: {
      senderId: yonatan.id,
      channelId: AbuDhabi.id,
      content: 'Hello Gabdoush, I am fine, how are you?',
    },
  });
  await prisma.messages.create({
    data: {
      senderId: gabdoush.id,
      channelId: AbuDhabi.id,
      content: 'everything is fine',
    },
  });
  await prisma.messages.create({
    data: {
      senderId: yonatan.id,
      channelId: AbuDhabi.id,
      content: 'yes, everything is fine',
    },
  });
  await prisma.messages.create({
    data: {
      senderId: samad.id,
      channelId: AbuDhabi.id,
      content: 'Hello Abudhabi',
    },
  });
  await prisma.messages.create({
    data: {
      senderId: samad.id,
      channelId: AbuDhabi.id,
      content: 'Hello Abudhabi',
    },
  });
}

main()
  .catch((e) => console.error(e.message))
  .finally(async () => await prisma.$disconnect());
