import { Injectable } from '@nestjs/common';
import { Player } from '../player/player.service';

@Injectable()
export class GameRoomService {
  private gameRooms: Map<string, GameRoom> = new Map();

  generateUniqueRoomId(): string {
    const timestamp = new Date().getTime();
    const randomPart = Math.random().toString(36);
    // Combine the timestamp and random part to create a unique ID
    const uniqueId = `${timestamp}-${randomPart}`;
    return uniqueId;
  }

  // Create a new game room
  createGameRoom(player1: Player, player2: Player): string {
    const roomID = this.generateUniqueRoomId();
    var refPlayer: Player;
    if (player1.worldWidth > player2.worldWidth) refPlayer = player2;
    else refPlayer = player1;
    const newRoom: GameRoom = {
      roomID,
      players: [player1, player2],
      ballPosition: {
        x: 0,
        y: 0,
      },
      worldWidth: refPlayer.worldWidth,
      worldHeight: refPlayer.worldHeight,
      ballVelocity: { x: 2, y: 1},
      paddleWidth: 0,
      paddleHeight: 0,
      ballWidth: 0,
      gameOver: false,
    };
    this.gameRooms.set(roomID, newRoom);
    return roomID;
  }

  getGameRoom(roomID: string): GameRoom | null {
    if (this.gameRooms.has(roomID)) {
      return this.gameRooms.get(roomID);
    }
    return null;
  }

  // Add a player to a game room
  // addPlayerToRoom(roomId: string, playerId: string): boolean {
  //   const room = this.gameRooms.get(roomId);
  //   if (room) {
  //     if (!room.players.includes(playerId)) {
  //       room.players.push(playerId);
  //       return true;
  //     }
  //   }
  //   return false;
  // }

  // Remove a player from a game room
  // removePlayerFromRoom(roomId: string, playerId: string): boolean {
  //   const room = this.gameRooms.get(roomId);
  //   if (room) {
  //     const playerIndex = room.players.indexOf(playerId);
  //     if (playerIndex !== -1) {
  //       room.players.splice(playerIndex, 1);
  //       return true;
  //     }
  //   }
  //   return false;
  // }
}

export type GameRoom = {
  roomID: string;
  players: Player[];
  worldWidth: number;
  worldHeight: number;
  ballVelocity: { x: number; y: number };
  ballPosition: { x: number; y: number };
  paddleWidth: number;
  paddleHeight: number;
  ballWidth: number;
  gameOver: boolean;
};
