import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

//================================================================================================================
// Testing the friends and user
/**
async function main() {
  console.log('Seeding started:');
  console.log('-------------------------------');

  // Delete all the user at the beginning from the database.
  await prisma.user.deleteMany();

  //------------------------------------------------
  // Creating the main user.
  const newUser = await prisma.user.create({
    data: {
      login: 'gabdoush',
      email: 'gabdoush@hotmail.com',
      name: 'Ghaiath',
      lastName: 'Abdoush',
    },
  });
  console.log('The user: ', newUser.id, newUser.login, ' has been created.');
  

  //------------------------------------------------
  const newFriend1 = await prisma.user.create({
    data: {
      login: 'yonatan',
      email: 'yonatan@hotmail.com',
      name: 'Yonathan',
      lastName: 'Monges',
    },
  });
  console.log('The user: ', newFriend1.id, newFriend1.login, ' has been created.');

  const newFriend2 = await prisma.user.create({
    data: {
      login: 'Samad',
      email: 'Samad@hotmail.com',
      name: 'Abdul',
      lastName: 'Samad',
    },
  });
  console.log('The user: ', newFriend2.id, newFriend2.login, ' has been created.');
  
  //------------------------------------------------
  // Creating a friend relations.
  await prisma.friend.create({
    data: {
      friendId: newFriend1.id,
      userId: newUser.id,
    }
  })
  console.log("friend relation created: [", newUser.login, "+", newFriend1.login, "]");



  // Creating a friend relations.
  await prisma.friend.create({
    data: {
      friendId: newFriend2.id,
      userId: newUser.id,
    }
  })
  console.log("friend relation created: [", newUser.login, "+", newFriend2.login, "]");



  console.log('-------------------------------');
  console.log("All the friends of the user: ", newUser.login);

  const userFriends = await prisma.friend.findMany({
    where: { userId: newUser.id }
  });
  
  for (const friend of userFriends) {
    const friendTable = await prisma.user.findUnique({
      where: { id: friend.friendId }
    });
    console.log(friend.friendId, friendTable);
    
  };



  console.log('-------------------------------');
  console.log('Seeding finished.');
}

 */

//================================================================================================================
// Testing the Channels and the channels members.

async function main() {
  console.log('Seeding started:');
  console.log('==============================================================');

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
  // Creating 3 users.

  const gabdoush = await prisma.user.create({
    data: {
      login: 'gabdoush',
      email: 'gabdoush@hotmail.com',
      name: 'Ghaiath Abdoush',
      isOnline: true,
      score: 120,
    },
  });

  console.log(
    'The user: [',
    gabdoush.id,
    '] [',
    gabdoush.login,
    '] has been created.',
  );

  //------------------------------------------------

  const yonatan = await prisma.user.create({
    data: {
      login: 'yonatan',
      email: 'yonatan@hotmail.com',
      name: 'Yonathan Monges',
      isOnline: true,
      score: 120,
    },
  });

  console.log(
    'The user: [',
    yonatan.id,
    '] [',
    yonatan.login,
    '] has been created.',
  );

  //------------------------------------------------

  const samad = await prisma.user.create({
    data: {
      login: 'samad',
      email: 'samad@hotmail.com',
      name: 'Samad Abdul',
      isOnline: true,
      score: 120,
    },
  });

  console.log(
    'The user: [',
    samad.id,
    '] [',
    samad.login,
    '] has been created.',
  );

  //================================================================================================================
  console.log('-------------------------------------------------------------');
  //================================================================================================================
  // Creating '42 AbuDhabi' channel

  const AbuDhabi = await prisma.channel.create({
    data: {
      channelName: '42 AbuDhabi',
      channelType: 'PUBLIC',
      createdBy: gabdoush.id,
      channelMembers: {
        create: {
          userId: gabdoush.id,
        },
      },
    },
  });

  console.log(
    'The channel: [',
    AbuDhabi.id,
    '] [',
    AbuDhabi.channelName,
    '] has been created.',
  );

  //------------------------------------------------
  // Creating 'FourTwo' channel

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

  console.log(
    'The channel: [',
    FourTwo.id,
    '] [',
    FourTwo.channelName,
    '] has been created.',
  );

  //------------------------------------------------
  // Creating Dubai channel

  const Dubai = await prisma.channel.create({
    data: {
      channelName: '42 Dubai',
      channelType: 'PUBLIC',
      createdBy: gabdoush.id,
      channelMembers: {
        create: {
          userId: gabdoush.id,
        },
      },
    },
  });

  console.log(
    'The channel: [',
    Dubai.id,
    '] [',
    Dubai.channelName,
    '] has been created.',
  );
  //------------------------------------------------
  // Creating Sharjah channel

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

  console.log(
    'The channel: [',
    Dubai.id,
    '] [',
    Dubai.channelName,
    '] has been created.',
  );
  //================================================================================================================
  console.log('-------------------------------------------------------------');
  //================================================================================================================
  // Adding channelRelation between the users to the channel.

  const relation_1 = await prisma.channelRelation.create({
    data: {
      channelId: Dubai.id,
      userId: yonatan.id,
    },
  });
  console.log(
    'channelRelation created: [',
    relation_1.id,
    '] [channelId ->',
    relation_1.channelId,
    '+ userId ->',
    relation_1.userId,
    ']',
  );

  //------------------------------------------------
  const relation_2 = await prisma.channelRelation.create({
    data: {
      channelId: AbuDhabi.id,
      userId: samad.id,
    },
  });
  console.log(
    'channelRelation created: [',
    relation_2.id,
    '] [channelId ->',
    relation_2.channelId,
    '+ userId ->',
    relation_2.userId,
    ']',
  );

  //------------------------------------------------
  const relation_3 = await prisma.channelRelation.create({
    data: {
      channelId: AbuDhabi.id,
      userId: yonatan.id,
    },
  });
  console.log(
    'channelRelation created: [',
    relation_3.id,
    '] [channelId ->',
    relation_3.channelId,
    '+ userId ->',
    relation_3.userId,
    ']',
  );

  //================================================================================================================
  // Sending first time friend request from Gabdoush to Yonatan.
  await prisma.friendRelation.create({
    data: {
      userId: gabdoush.id,
      friendId: yonatan.id,
      friendStatus: 'PENDING',
    },
  });

  // Gabdoush blocking Yonatan.
  await prisma.friendRelation.updateMany({
    where: {
      userId: gabdoush.id,
      friendId: yonatan.id,
    },
    data: {
      friendStatus: 'BLOCKED',
      blockedBy: gabdoush.id,
    },
  });

  //Yonatan sends a friend request to Samad
  await prisma.friendRelation.create({
    data: {
      userId: yonatan.id,
      friendId: samad.id,
      friendStatus: 'BLOCKED',
      blockedBy: samad.id,
    },
  });

  //================================================================================================================
  await prisma.messages.create({
    data: {
      senderId: gabdoush.id,
      receiverId: yonatan.id,
      content: 'Hello Yonatan, how are you?',
    },
  });
  await prisma.messages.create({
    data: {
      senderId: yonatan.id,
      receiverId: gabdoush.id,
      content: 'Hello Gabdoush, I am fine, how are you?',
    },
  });
  await prisma.messages.create({
    data: {
      senderId: gabdoush.id,
      receiverId: yonatan.id,
      content: 'everything is fine',
    },
  });
  await prisma.messages.create({
    data: {
      senderId: yonatan.id,
      receiverId: gabdoush.id,
      content: 'yes, everything is fine',
    },
  });
  
  //-------------------------------------------------------------
  // Sending a message to the channel.

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
  //================================================================================================================
  console.log("All the DMs between ");
  // retrieve all the messages between gabdoush and yonatan:
  const gabdoushYonatanMessages = await prisma.messages.findMany({
    where: {
      OR: [
        {
          senderId: gabdoush.id,
          receiverId: yonatan.id,
        },
        {
          senderId: yonatan.id,
          receiverId: gabdoush.id,
        },
      ],
    },
  });
  console.log(gabdoushYonatanMessages);
  //================================================================================================================
  console.log('==============================================================');
  console.log('Seeding finished.');
}

main()
  .catch((e) => console.error(e.message))
  .finally(async () => await prisma.$disconnect());
