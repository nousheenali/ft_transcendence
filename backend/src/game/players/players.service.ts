// import { Injectable } from '@nestjs/common';
// import { Socket } from 'socket.io';

// @Injectable()
// export class PlayersService {
//   private players: Map<string, Player> = new Map();

//   // Add a player to the player list
//   addPlayer(socket: Socket, playerName: string): void {
//     if (!this.players.has(socket.id)) {
//       const player: Player = {
//         id: socket.id,
//         name: playerName,
//         position: { x: 0, y: 0 },
//       };
//       this.players.set(socket.id, player);
//     }
//   }

//   getPlayer(clientID: string): Player | null{
//     if (this.players.has(clientID)) {
//       const player: Player = this.players.get(clientID);
//       return player;
//     }
//     return null;
//   }

//   printPlayers() {
//     console.log('--------CONNECTED PLAYERS--------');
//     for (const [key, player] of this.players.entries()) {
//       console.log(`Key: ${key}, Value:`, player);
//     }
//     console.log('---------------------------------');
//   }

//   removePlayer(clientID: string) {
//     if (this.players.has(clientID)) {
//       this.players.delete(clientID);
//     }
//   }

//   // Update the position of a player
//   updatePlayerPosition(
//     socketId: string,
//     position: { x: number; y: number },
//   ): void {
//     const player = this.players.get(socketId);
//     if (player) {
//       player.position = position;
//     }
//   }
// }

// export interface Player {
//   id: string;
//   name: string;
//   position: { x: number; y: number };
// }
