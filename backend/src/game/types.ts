import { Socket } from 'socket.io';

export type Player = {
  id: string;
  name: string;
  position: { x: number; y: number };
  readyToStart: boolean;
  worldWidth: number;
  worldHeight: number;
  score: number;
  gameRoom: string;
  socketInfo: Socket;
};

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
  gameStarted: boolean; // we need separate gameStarted from gameOver to track users disconnected before starting game
  increaseSpeed: number; //used as flag for increasing ball speed
};

export interface WorldDimensions {
  width: number;
  height: number;
}

export interface WaitingRoom {
  invitee: string;
  worldDimensions: WorldDimensions;
}

export interface JoinWaitingRoom {
  inviter: string;
  worldDimensions: WorldDimensions;
  accept: boolean;
}


export interface joiningData {
  roomID: string;
  p0Name: string;
  p1Name: string;
  worldDimensions: WorldDimensions;
};

export interface SpritePosition {
  x: number;
  y: number;
}

export interface SpriteDimension {
  width: number;
  height: number;
}

export interface UpdateSpritePositions {
  roomID: string;
  ballPosition: SpritePosition;
  p0Position: SpritePosition;
  p1Position: SpritePosition;
  paddle: SpriteDimension;
  ballWidth: number;
}

export interface BallPosition {
  position: SpritePosition;
  p0_score: number; //player0 score
  p1_score: number; //player1 score
}

export interface GameOver {
  message: string;
  name: string;
  p0_score: number; //player0 score
  p1_score: number; //player1 score
}

