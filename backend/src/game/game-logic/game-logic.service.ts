import { Injectable } from '@nestjs/common';
import { GameGateway } from '../game.gateway';
import { GameRoomService } from '../game-room/game-room.service';
import { PlayerService } from '../player/player.service';
import { GameService } from '../game.service';
import { GameStatus } from '@prisma/client';
import { Server } from 'socket.io';
import {
  BallPosition,
  GameOver,
  GameRoom,
  Player,
  UpdateSpritePositions,
  joiningData,
} from '../types';

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
      roomID: room.roomID,
      p0Name: p0.name,
      p1Name: p1.name,
      worldDimensions: {
        width: room.worldWidth,
        height: room.worldHeight,
      },
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

  updateBallPosition(gm: GameRoom, delta) {
    gm.ballPosition.x += (gm.ballVelocity.x * delta) ;
    gm.ballPosition.y += (gm.ballVelocity.y * delta);
  }

  emitHitPaddle(gm: GameRoom, server: Server, surface: boolean) {
    /* surface: shows which surface was hit (false-wall, true-paddle) */
    server.to(gm.players[0].id).emit('hitPaddle', surface);
    server.to(gm.players[1].id).emit('hitPaddle', surface);
  }

  emitGameOver(gm: GameRoom, server: Server, winner: Player, loser: Player) {
    if (gm.players[0].score === 10 || gm.players[1].score === 10) {
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
      /* disconnect will call the handleDisconnect in game gateway */
      gm.players[0].socketInfo.disconnect(true);
      gm.players[1].socketInfo.disconnect(true);
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

  // increaseBallSpeed(gm: GameRoom) {
  //   if (gm.increaseSpeed === 0) {
  //     gm.ballVelocity.x *= 2;
  //     gm.ballVelocity.y *= 2;
  //     gm.increaseSpeed = 1;
  //   }
  // else if (gm.increaseSpeed === 1) {
  //   gm.ballVelocity.x *= 1.25;
  //   gm.ballVelocity.y *= 1.25;
  //   gm.increaseSpeed = 2;
  // }
  // }

  /* SHow results on the game screen */
  updateResults(
    server: Server,
    gm: GameRoom,
    otherPlyr: Player,
    player: Player,
  ) {
    /* if game not started delete database entry*/
    if(gm.gameStarted)
      this.gamePrismaService.updateGameEntry(
        gm.roomID,
        GameStatus.FINISHED,
        otherPlyr.login,
        player.login,
      );
    else
        this.gamePrismaService.deleteGameEntry(gm.roomID);
    const data: GameOver = {
      message: 'Other Player Disconnected',
      name: gm.gameStarted ? otherPlyr.name : null,
      p0_score: gm.players[0].score,
      p1_score: gm.players[1].score,
    };
    server.to(otherPlyr.id).emit('gameOver', data);
    this.gameRoomService.removeGameRoom(gm.roomID);
  }

  rightPaddleCollision(server: Server, gm: GameRoom, buffer: number) {
    if (
      gm.ballPosition.y >=
        gm.players[0].position.y - gm.paddleHeight / 2 - buffer &&
      gm.ballPosition.y <=
        gm.players[0].position.y + gm.paddleHeight / 2 + buffer &&
      gm.ballVelocity.x > 0 // This is included so that the ball doesn't get stuck inside the paddle
    ) {
      this.emitHitPaddle(gm, server, true);
      gm.ballVelocity.x *= -1;
      gm.ballPosition.y += gm.ballVelocity.y;
    }
  }

  leftPaddleCollision(server: Server, gm: GameRoom, buffer: number) {
    if (
      gm.ballPosition.y >
        gm.players[1].position.y - gm.paddleHeight / 2 - buffer &&
      gm.ballPosition.y <
        gm.players[1].position.y + gm.paddleHeight / 2 + buffer &&
      gm.ballVelocity.x < 0
    ) {
      this.emitHitPaddle(gm, server, true);
      gm.ballVelocity.x *= -1;
      gm.ballPosition.y += gm.ballVelocity.y;
    }
  }

  rightWallCollision(server: Server, gm: GameRoom, buffer: number) {
    this.emitHitPaddle(gm, server, false);
    gm.ballVelocity.x *= -1;
    gm.players[1].score += 1;
    if (gm.players[1].score === 10)
      this.emitGameOver(gm, server, gm.players[1], gm.players[0]);
  }

  leftWallCollision(server: Server, gm: GameRoom, buffer: number) {
    this.emitHitPaddle(gm, server, false);
    gm.ballVelocity.x *= -1; // Reverse the x velocity for left and right wall
    gm.players[0].score += 1;
    if (gm.players[0].score === 10)
      this.emitGameOver(gm, server, gm.players[0], gm.players[1]);
  }

  topBottomWallCollision(server: Server, gm: GameRoom, buffer: number) {
    this.emitHitPaddle(gm, server, false);
    gm.ballVelocity.y *= -1; // Reverse the y velocity for top wall
  }
}
