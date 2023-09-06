import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();


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
      firstName: 'Ghaiath',
      lastName: 'Abdoush',
    },
  });
  console.log('The user: ', newUser.id, newUser.login, ' has been created.');
  

  //------------------------------------------------
  const newFriend1 = await prisma.user.create({
    data: {
      login: 'yonatan',
      email: 'yonatan@hotmail.com',
      firstName: 'Yonathan',
      lastName: 'Monges',
    },
  });
  console.log('The user: ', newFriend1.id, newFriend1.login, ' has been created.');

  const newFriend2 = await prisma.user.create({
    data: {
      login: 'Samad',
      email: 'Samad@hotmail.com',
      firstName: 'Abdul',
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

// Testing the Channels and the channels members.
async function main() {
  console.log('Seeding started:');
  console.log('==============================================================');

  //================================================================================================================
  // Delete all data from the DataBase at the beginning to avoid any errors.
  
  await prisma.user.deleteMany();
  await prisma.friend.deleteMany();
  await prisma.channel.deleteMany();
  await prisma.channelMember.deleteMany();
  //================================================================================================================
  // Creating the main user.

  const user_1 = await prisma.user.create({
    data: {
      login: 'gabdoush',
      email: 'gabdoush@hotmail.com',
      firstName: 'Ghaiath',
      lastName: 'Abdoush',
    },
  });

  console.log('The user: ', user_1.id, user_1.login, ' has been created.');

  //================================================================================================================
  // Creating a channel

  const newChannel = await prisma.channel.create({
    data: {
      channelName: '42 AbuDhabi',
      channelType: 'PUBLIC',
      createdBy: user_1.id,
    }
  })

  console.log('The channel: [', newChannel.id, newChannel.channelName, '] has been created by: [', newChannel.createdBy, ']');
  
  //================================================================================================================
  // Create new 2 users.

  const user_2 = await prisma.user.create({
    data: {
      login: 'yonatan',
      email: 'yonatan@hotmail.com',
      firstName: 'Yonathan',
      lastName: 'Monges',
    },
  });

  //------------------------------------------------
  const user_3 = await prisma.user.create({
    data: {
      login: 'Samad',
      email: 'Samad@hotmail.com',
      firstName: 'Abdul',
      lastName: 'Samad',
    },
  });

  //================================================================================================================
  // Adding the users to the channel.

  // Adding user_2 to the channel.
  await prisma.channelMember.create({
    data: {
      channelId: newChannel.id,
      userId: user_2.id,
    }
  })

  // Adding user_3 to the channel.
  await prisma.channelMember.create({
    data: {
      channelId: newChannel.id,
      userId: user_3.id,
    }
  })

  //================================================================================================================
  // Getting all the members of the channel.

  const channelMembers = await prisma.channelMember.findMany({
    where: {channelId: newChannel.id}
  })
  console.log('The members of the channel: [', newChannel.channelName, '] are:');

  // Getting the tables of the members of the channel.
  
  for (const member of channelMembers) {
    const memberTable = await prisma.user.findUnique({
      where: {id: member.userId}
    })
    console.log(member.userId, memberTable);
  }

  //================================================================================================================
  console.log('==============================================================');
  console.log('Seeding finished.');
}

main()
  .catch((e) => console.error(e.message))
  .finally(async () => await prisma.$disconnect());