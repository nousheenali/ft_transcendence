import { Injectable } from '@nestjs/common';
import { PlayerService } from '../player/player.service';
import { GameRoom, Player } from '../types';

@Injectable()
export class GameRoomService {
  private gameRooms: Map<string, GameRoom> = new Map();
  /* Initial Ball Velocity for a game room */
  private VelX = 0.5;
  private VelY = 0.5;

  constructor(private playerService: PlayerService) {}

  /* Creates a new game room */
  createGameRoom(roomID: string, player1: Player, player2: Player): GameRoom {
    var refPlayer: Player;
    /* Game room dimensions equals that of the player with smaller window dimensions  */
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
      worldHeight: (refPlayer.worldWidth * 3) / 4,
      ballVelocity: { x: this.VelX, y: this.VelY },
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

  /* when a user creates a room and waits for the other user to join */
  createWaitingRoom(roomID: string, player1: Player) {
    const newRoom: GameRoom = {
      roomID,
      players: [player1],
      ballPosition: {
        x: 0,
        y: 0,
      },
      worldWidth: player1.worldWidth,
      worldHeight: (player1.worldWidth * 3) / 4,
      ballVelocity: { x: this.VelX, y: this.VelY },
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
      /* Checks if the new user has smaller window dimensions
      If yes, then game room dimensions are changed to match the new user. */
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

  /* Remove game room  from Map */
  removeGameRoom(roomId: string) {
    if (this.gameRooms.has(roomId)) {
      this.gameRooms.delete(roomId);
    }
  }
}
