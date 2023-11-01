import { Injectable } from '@nestjs/common';

@Injectable()
export class PlayerService {
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
        worldWidth: 0,
        worldHeight: 0,
        score: 0,
      };
      this.players.set(clientID, player);
    }
  }

  removePlayer(clientID: string) {
    if (this.players.has(clientID)) {
      this.players.delete(clientID);
    }
  }

  getPlayerByID(clientID: string): Player | null {
    if (this.players.has(clientID)) {
      const player: Player = this.players.get(clientID);
      return player;
    }
    return null;
  }

  getPlayerByName(name: string): Player | undefined {
    for (const player of this.players.values()) {
      if (player.name === name) {
        return player;
      }
    }
    return null;
  }

  playerReady(clientID: string): void {
    const player: Player = this.players.get(clientID);
    if (player) player.readyToStart = true;
  }

  // add player to queue
  addToQueue(clientID: string, width: number, height: number) {
    const player: Player = this.getPlayerByID(clientID);
    player.worldWidth = width;
    player.worldHeight = height;
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
  worldWidth: number;
  worldHeight: number;
  score: number;
};
