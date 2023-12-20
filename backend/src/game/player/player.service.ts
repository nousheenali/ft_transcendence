import { Injectable } from '@nestjs/common';
import { Socket } from 'socket.io';
import { Player } from '../types';

@Injectable()
export class PlayerService {
  private players: Map<string, Player> = new Map();
  private queue: Player[] = [];

  constructor() {}

  /* Creates a player and adds it to players Map */
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

  /* Removes player from players Map */
  removePlayer(clientID: string) {
    if (this.players.has(clientID)) {
      this.players.delete(clientID);
    }
  }

  /* Player by socket id */
  getPlayerBySocketID(clientID: string): Player | null {
    if (this.players.has(clientID)) {
      const player: Player = this.players.get(clientID);
      return player;
    }
    return null;
  }

  /* Player by login */
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

  /* Add player to queue */
  addToQueue(clientID: string, width: number, height: number) {
    const player: Player = this.getPlayerBySocketID(clientID);
    player.worldWidth = width;
    player.worldHeight = height;
    if (player) {
      this.queue.push(player);
    }
  }

  printQueue() {
    console.log('----------QUEUE ENTRIES---------------');
    console.log(
      'Queue values:',
      this.queue.map((player) => player.login),
    );
    console.log('-------------------------------------');
  }

  /* Removes player from queue */
  removeFromQueue(playerIdToRemove: string) {
    const indexToRemove = this.queue.findIndex(
      (player) => player.id === playerIdToRemove,
    );
    if (indexToRemove !== -1) this.queue.splice(indexToRemove, 1);
  }

  /* Matches and removes the first two players from the queue */
  matchQueuedPlayers(): Player[] | null {
    if (this.queue.length >= 2) {
      const players = this.queue.splice(0, 2);
      return players;
    }
    return null;
  }
}


