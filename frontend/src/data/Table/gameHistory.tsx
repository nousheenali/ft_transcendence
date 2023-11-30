// export const generateGameHistoryData = (numRecords = 100) => {
//   const records = [];

//   for (let i = 1; i <= numRecords; i++) {
//     records.push([
//       { playerName: `Player${i}`, img: `/av1.svg`, name: `Name${i}` },
//       `1801`,
//       `10`,
//       `7`,
//       `3`,
//     ]);
//   }
//   return records;
// };

import { Game } from '@/components/GameComponents/types';
import { formatDistanceToNow } from 'date-fns';

/**======================================================================================================**/

export const generateGameHistoryData = (
  userLogin: string,
  gameHistory: Game[] | undefined
) => {
  const records: any = [];

  if (!gameHistory || !userLogin) return null;
  gameHistory.forEach((game) => {
    // --------------------- if the user is the opponent in the game ---------------------
    if (game.User.login === userLogin) {
      const formattedTime = formatDistanceToNow(new Date(game.startTime), {
        addSuffix: true,
      });
      records.push([
        {
          playerName: gameHistory.indexOf(game),
          img: game.opponent.avatar,
          name: game.opponent.name,
        },
        `${game.opponent.score}`,
        formattedTime,
        game.winnerId === userLogin ? 'Win' : 'Lose',
      ]);
    }
    // --------------------- if the user is the player in the game ---------------------
    else {
      const formattedTime = formatDistanceToNow(new Date(game.startTime), {
        addSuffix: true,
      });
      records.push([
        {
          playerName: gameHistory.indexOf(game),
          img: game.User.avatar,
          name: game.User.name,
        },
        `${game.User.score}`,
        formattedTime,
        `10`,
        game.winnerId === userLogin ? 'Win' : 'Lose',
      ]);
    }
  });
  console.log('records => ', records);
  return records;
};

/**======================================================================================================**/
