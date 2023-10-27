import { Injectable } from '@nestjs/common';
import { GameState } from './model/game-state.model';
import { type } from 'os';
import { Socket } from 'socket.io';

@Injectable()
export class GameService {
  private players: Map<string, Player> = new Map();
  private queue: Player[] = [];

  constructor() {}

  addPlayer(clientID: string, userName: string) {
    if (!this.players.has(clientID)) {
      const player: Player = {
        id: clientID,
        name: userName,
        position: { x: 0, y: 0 },
        readyToStart: false,
      };
      this.players.set(clientID, player);
    }
  }

  removePlayer(clientID: string) {
    if (this.players.has(clientID)) {
      this.players.delete(clientID);
    }
  }

  getPlayer(clientID: string): Player | null {
    if (this.players.has(clientID)) {
      const player: Player = this.players.get(clientID);
      return player;
    }
    return null;
  }

  playerReady(clientID: string): void {
    const player: Player = this.players.get(clientID);
    if(player)
      player.readyToStart = true;
  }

  // add player to queue
  addToQueue(clientID: string) {
    const player: Player = this.getPlayer(clientID);
    if (player) {
      this.queue.push(player);
    }
  }

  matchQueuedPlayers(): Player[] | null {
    if (this.queue.length >= 2) {
      // Get and remove the first two players from the queue
      const players = this.queue.splice(0, 2);
      return players;
    }
    return null;
  }

  // updateGame(player: string, position: number) {
  //   this.gameState.updatePlayerPosition(player, position);
  //   this.gameState.detectCollisions();
  //   this.gameState.updateScores();
  // }
}


export type Player = {
  id: string;
  name: string;
  position: { x: number; y: number };
  readyToStart: boolean;
}
