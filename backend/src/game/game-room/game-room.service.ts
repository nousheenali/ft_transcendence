import { Injectable } from '@nestjs/common';
import { Player, PlayerService } from '../player/player.service';

@Injectable()
export class GameRoomService {
  private gameRooms: Map<string, GameRoom> = new Map();

  constructor(private playerService: PlayerService) {}

  generateUniqueRoomId(): string {
    const timestamp = new Date().getTime();
    const randomPart = Math.random().toString(36);
    // Combine the timestamp and random part to create a unique ID
    const uniqueId = `${timestamp}-${randomPart}`;
    return uniqueId;
  }

  // Create a new game room
  createGameRoom(roomID: string, player1: Player, player2: Player): GameRoom {
    // const roomID = this.generateUniqueRoomId();
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
      ballVelocity: { x: 4, y: 2 },
      paddleWidth: 0,
      paddleHeight: 0,
      ballWidth: 0,
      gameOver: false,
      gameStarted: false,
      increaseSpeed: 0,
    };
    player1.gameRoom = roomID;
    player2.gameRoom = roomID;
    this.playerService.removeFromQueue(player1.id);
    this.playerService.removeFromQueue(player2.id);
    this.gameRooms.set(roomID, newRoom);
    return newRoom;
  }

  //when a user creates a room and waits for the other user to join
  createWaitingRoom(roomID: string, player1: Player) {
    const newRoom: GameRoom = {
      roomID,
      players: [player1],
      ballPosition: {
        x: 0,
        y: 0,
      },
      worldWidth: player1.worldWidth,
      worldHeight: player1.worldHeight,
      ballVelocity: { x: 4, y: 2 },
      paddleWidth: 0,
      paddleHeight: 0,
      ballWidth: 0,
      gameOver: false,
      gameStarted: false,
      increaseSpeed: 0,
    };
    player1.gameRoom = roomID;
    this.gameRooms.set(roomID, newRoom);
  }

  joinWaitingRoom(roomID: string, player2: Player): GameRoom {
    const room = this.getGameRoom(roomID);
    if (room && room.players.length == 1) {
      room.players.push(player2);
      if (room.worldWidth > player2.worldHeight) {
        room.worldWidth = player2.worldWidth;
        room.worldHeight = player2.worldHeight;
      }
      player2.gameRoom = roomID;
      return room;
    }
  }

  getGameRoom(roomID: string): GameRoom | null {
    if (this.gameRooms.has(roomID)) {
      return this.gameRooms.get(roomID);
    }
    return null;
  }

  // Remove game room
  removeGameRoom(roomId: string) {
    if (this.gameRooms.has(roomId)) {
      this.gameRooms.delete(roomId);
    }
  }
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
  gameStarted: boolean; // we need separate gameStarted to track users disconnected before starting game
  increaseSpeed: number; //used as flag for increasing ball speed
};
