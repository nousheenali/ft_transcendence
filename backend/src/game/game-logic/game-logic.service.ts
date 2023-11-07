import { Injectable } from '@nestjs/common';
import { GameGateway } from '../game.gateway';
import { GameRoom, GameRoomService } from '../game-room/game-room.service';
import { Player, PlayerService } from '../player/player.service';
import { GameService } from '../game.service';

@Injectable()
export class GameLogicService {
  constructor(
    private playerService: PlayerService,
    private gameRoomService: GameRoomService,
    private gamePrismaService: GameService,
  ) {}

  sendJoiningInformation(server: any, room: GameRoom, p0: Player, p1: Player) {
    const data = {
      roomID: room.roomID,
      p0Name: p0.name,
      p1Name: p1.name,
      worldWidth: room.worldWidth,
      worldHeight: room.worldHeight,
    };
    server.to(p0.id).emit('matched', data);
    server.to(p1.id).emit('matched', data);
  }

  spritePositions(gameRoom: GameRoom, data: any) {
    gameRoom.ballWidth = data.ballWidth;
    gameRoom.paddleWidth = data.paddleWidth;
    gameRoom.paddleHeight = data.paddleHeight;
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

  emitHitPaddle(gm: GameRoom, server: any) {
    server.to(gm.players[0].id).emit('hitPaddle');
    server.to(gm.players[1].id).emit('hitPaddle');
  }

  emitGameOver(gm: GameRoom, server: any, winner: Player, loser: Player) {
    if (gm.players[0].score === 7 || gm.players[1].score === 7) {
      gm.gameOver = true;
      server.to(gm.players[0].id).emit('gameOver', 'Game Over!', winner.name);
      server.to(gm.players[1].id).emit('gameOver', 'Game Over!', winner.name);
      this.gamePrismaService.updateGameEntry(
        gm.roomID,
        winner.name,
        loser.name,
      );
      gm.players[0].socketInfo.disconnect(true);
      gm.players[1].socketInfo.disconnect(true);
      //disconnect will call the handleDisconnect in game gateway
    }
  }

  emitBallPosition(gm: GameRoom, server: any) {
    server
      .to(gm.players[0].id)
      .emit(
        'updateBallPosition',
        gm.ballPosition,
        gm.players[0].score,
        gm.players[1].score,
      );
    server
      .to(gm.players[1].id)
      .emit(
        'updateBallPosition',
        gm.ballPosition,
        gm.players[0].score,
        gm.players[1].score,
      );
  }

  increaseBallSpeed(gm: GameRoom) {
    if (gm.increaseSpeed === 0) {
      gm.ballVelocity.x *= 1.25;
      gm.ballVelocity.y *= 1.25;
      gm.increaseSpeed = 1;
    } else if (gm.increaseSpeed === 1) {
      gm.ballVelocity.x *= 1.25;
      gm.ballVelocity.y *= 1.25;
      gm.increaseSpeed = 2;
    }
  }

  updateResults(server: any, gm: GameRoom, otherPlyr: Player, player: Player) {
    let winner = '';
    let loser = '';
    //there will be winner /loser only if the game started
    if (gm.gameStarted) {
      winner = otherPlyr.name;
      loser = player.name;
    }
    this.gamePrismaService.updateGameEntry(gm.roomID, winner, loser);
    server
      .to(otherPlyr.id)
      .emit('gameOver', 'Other Player Disconnected', winner);
    this.gameRoomService.removeGameRoom(gm.roomID);
  }
}
