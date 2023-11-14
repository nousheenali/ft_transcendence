import { Injectable } from '@nestjs/common';
import { Socket } from 'socket.io';
import { Player } from '../types';

@Injectable()
export class PlayerService {
  private players: Map<string, Player> = new Map();
  private queue: Player[] = [];

  constructor() {}

  addPlayer(client: Socket, login: string, userName: string) {
    if (!this.players.has(client.id)) {
      const player: Player = {
        id: client.id,
        login: login,
        name: userName,
        position: { x: 0, y: 0 },
        readyToStart: false,
        worldWidth: 0,
        worldHeight: 0,
        score: 0,
        gameRoom: null,
        socketInfo: client,
      };
      this.players.set(client.id, player);
    }
  }

  removePlayer(clientID: string) {
    if (this.players.has(clientID)) {
      this.players.delete(clientID);
    }
  }

  getPlayerBySocketID(clientID: string): Player | null {
    if (this.players.has(clientID)) {
      const player: Player = this.players.get(clientID);
      return player;
    }
    return null;
  }

  getPlayerByLogin(login: string): Player | undefined {
    for (const player of this.players.values()) {
      if (player.login === login) {
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
    const player: Player = this.getPlayerBySocketID(clientID);
    player.worldWidth = width;
    player.worldHeight = height;
    if (player) {
      this.queue.push(player);
    }
  }

  removeFromQueue(playerIdToRemove: string) {
    const indexToRemove = this.queue.findIndex(
      (player) => player.id === playerIdToRemove,
    );
    if (indexToRemove !== -1)
      this.queue.splice(indexToRemove, 1);
  }

  matchQueuedPlayers(): Player[] | null {
    if (this.queue.length >= 2) {
      // Get and remove the first two players from the queue
      const players = this.queue.splice(0, 2);
      return players;
    }
    return null;
  }
}


