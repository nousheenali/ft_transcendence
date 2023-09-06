import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

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

main()
  .catch((e) => console.error(e.message))
  .finally(async () => await prisma.$disconnect());