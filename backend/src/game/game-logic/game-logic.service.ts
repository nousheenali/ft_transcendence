import { Injectable } from '@nestjs/common';
import { GameGateway } from '../game.gateway';
import { GameRoomService } from '../game-room/game-room.service';
import { PlayerService } from '../player/player.service';
import { GameService } from '../game.service';
import { GameStatus } from '@prisma/client';
import { Server } from 'socket.io';
import { BallPosition, GameOver, GameRoom, Player, UpdateSpritePositions, joiningData } from '../types';
import { BallPosition, GameOver, GameRoom, Player, UpdateSpritePositions, joiningData } from '../types';

@Injectable()
export class GameLogicService {
  constructor(
    private playerService: PlayerService,
    private gameRoomService: GameRoomService,
    private gamePrismaService: GameService,
  ) {}

  sendJoiningInformation(
    server: Server,
    room: GameRoom,
    p0: Player,
    p1: Player,
  ) {
    const data: joiningData = {
    const data: joiningData = {
      roomID: room.roomID,
      p0Name: p0.name,
      p1Name: p1.name,
      worldDimensions :{
        width: room.worldWidth,
        height: room.worldHeight,
      }
      worldDimensions :{
        width: room.worldWidth,
        height: room.worldHeight,
      }
    };
    server.to(p0.id).emit('matched', data);
    server.to(p1.id).emit('matched', data);
  }

  spritePositions(gameRoom: GameRoom, data: UpdateSpritePositions) {
    gameRoom.ballWidth = data.ballWidth;
    gameRoom.paddleWidth = data.paddle.width;
    gameRoom.paddleHeight = data.paddle.height;
    gameRoom.ballPosition.x = data.ballPosition.x;
    gameRoom.ballPosition.y = data.ballPosition.y;
    gameRoom.players[0].position.x = data.p0Position.x;
    gameRoom.players[0].position.y = data.p0Position.y;
    gameRoom.players[1].position.x = data.p1Position.x;
    gameRoom.players[1].position.y = data.p1Position.y;
  }

  updateBallPosition(gm: GameRoom) {
    gm.ballPosition.x += gm.ballVelocity.x;
    gm.ballPosition.y += gm.ballVelocity.y;
  }

  emitHitPaddle(gm: GameRoom, server: Server, surface: boolean) {
    /* surface: shows which surface was hit (false-wall, true-paddle) */
    server.to(gm.players[0].id).emit('hitPaddle', surface);
    server.to(gm.players[1].id).emit('hitPaddle', surface);
  }

  emitGameOver(gm: GameRoom, server: Server, winner: Player, loser: Player) {
    if (gm.players[0].score === 7 || gm.players[1].score === 7) {
      gm.gameOver = true;
      const data: GameOver = {
        message: 'Game Over!',
        name: winner.name,
        p0_score: gm.players[0].score,
        p1_score: gm.players[1].score,
      };
      server.to(gm.players[0].id).emit('gameOver', data);
      server.to(gm.players[1].id).emit('gameOver', data);
      this.gamePrismaService.updateGameEntry(
        gm.roomID,
        GameStatus.FINISHED,
        winner.login,
        loser.login,
      );
      gm.players[0].socketInfo.disconnect(true);
      gm.players[1].socketInfo.disconnect(true);
      /* disconnect will call the handleDisconnect in game gateway */
    }
  }

  emitBallPosition(gm: GameRoom, server: Server) {
    const data: BallPosition = {
      position: gm.ballPosition,
      p0_score: gm.players[0].score,
      p1_score: gm.players[1].score,
    };
    server.to(gm.players[0].id).emit('updateBallPosition', data);
    server.to(gm.players[1].id).emit('updateBallPosition', data);
  }

  increaseBallSpeed(gm: GameRoom) {
    if (gm.increaseSpeed === 0) {
      gm.ballVelocity.x *= 2;
      gm.ballVelocity.y *= 2;
      gm.increaseSpeed = 1;
    } 
    // else if (gm.increaseSpeed === 1) {
    //   gm.ballVelocity.x *= 1.25;
    //   gm.ballVelocity.y *= 1.25;
    //   gm.increaseSpeed = 2;
    // }
  }

  updateResults(
    server: Server,
    gm: GameRoom,
    otherPlyr: Player,
    player: Player,
  ) {
    /* There will be winner/loser only if the game started */
    this.gamePrismaService.updateGameEntry(
      gm.roomID,
      GameStatus.FINISHED,
      gm.gameStarted ? otherPlyr.login : null,
      gm.gameStarted ? player.login : null,
    );
    const data: GameOver = {
      message: 'Other Player Disconnected',
      name: gm.gameStarted ? otherPlyr.name : null,
      p0_score: gm.players[0].score,
      p1_score: gm.players[1].score,
    };
    server.to(otherPlyr.id).emit('gameOver', data);
    this.gameRoomService.removeGameRoom(gm.roomID);
  }
}
