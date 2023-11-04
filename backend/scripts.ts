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
        },
      });
    }
  };

  //================================================================================================================
  const sendMessagesToGabdoush = async (senders, gabdoush) => {
    for (const sender of senders) {
      await prisma.messages.create({
        data: {
          senderId: sender.id,
          receiverId: gabdoush.id,
          content: `Hello gabdoush from ${sender.login}, how are you....?`,
        },
      });
    }
  };

  //================================================================================================================
  const sendFromGabdoush = async (recievers, gabdoush) => {
    for (const reciever of recievers) {
      await prisma.messages.create({
        data: {
          senderId: gabdoush.id,
          receiverId: reciever.id,
          content: `Hello ${reciever.login} from gabdoush, how are you....?`,
        },
      });
    }
  };

  //================================================================================================================
  const sendMessagesToChannels = async (users, channels) => {
    for (const channel of channels) {
      for (let i = 0; i < 10; i++) {
        for (const user of users.concat(gabdoush)) {
          const senderId = user.login === 'gabdoush' ? gabdoush.id : user.id;
          await prisma.messages.create({
            data: {
              senderId: senderId,
              channelId: channel.id,
              content: `Hello from ${user.login} to ${channel.channelName}`,
            },
          });
        }
      }
    }
  };

  //================================================================================================================
  // Create friend relation between the users and gabdoush.
  const createFriendRelation = async (users, gabdoush) => {
    for (const user of users) {
      await prisma.friendRelation.create({
        data: {
          userId: user.id,
          friendId: gabdoush.id,
          friendStatus: 'ACCEPTED',
        },
      });
    }
  };

  //================================================================================================================
  // Create 5 users, and add gabdoush to them.
  const users = await createUsers(10);
  users.push(gabdoush);

  // Create 5 private channels and 5 public channels, and add gabdoush to them.
  const privateChannels = await createChannels(users, 2, 'PRIVATE');
  const publicChannels = await createChannels(users, 2, 'PUBLIC');

  // Add all users to all channels.
  await createChannelUserRelations(privateChannels);

  // Create friend relation between the users and gabdoush.
  await createFriendRelation(users, gabdoush);
  
  // Send messages to gabdoush from all users.
  await sendMessagesToGabdoush(users, gabdoush);
  await sendMessagesToGabdoush(users, gabdoush);
  await sendMessagesToGabdoush(users, gabdoush);

  // Send messages from gabdoush to all users.
  await sendFromGabdoush(users, gabdoush);
  await sendFromGabdoush(users, gabdoush);
  await sendFromGabdoush(users, gabdoush);

  // Send messages to all channels from all users and from gabdoush.
  await sendMessagesToChannels(users, privateChannels);
  await sendMessagesToChannels(users, publicChannels);

  //================================================================================================================
}

main()
  .catch((e) => console.error(e.message))
  .finally(async () => await prisma.$disconnect());
