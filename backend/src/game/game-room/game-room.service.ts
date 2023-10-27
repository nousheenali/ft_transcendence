import { Injectable } from '@nestjs/common';
import { Player } from '../game.service';

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
    const newRoom: GameRoom = {
      roomID,
      players: [player1, player2],
    };
    this.gameRooms.set(roomID, newRoom);
    return roomID;
  }

  getGameRoom(roomID: string) : GameRoom | null{
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
};
