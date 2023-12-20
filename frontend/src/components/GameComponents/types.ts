import { userInformation } from "../Profile/types";

export interface InitialData {
  x: number;
  y: number;
  controls: string;
}

export interface GameOver {
  message: string;
  name: string;
  p0_score: number; //player0 score
  p1_score: number; //player1 score
}

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

export interface WorldDimensions {
  width: number;
  height: number;
}

export interface joiningData {
  roomID: string;
  p0Name: string;
  p1Name: string;
  worldDimensions: WorldDimensions;
}

export interface WaitingRoom {
  invitee: string;
  worldDimensions: WorldDimensions;
}

export interface Game {
  gameStatus: string;
  startTime: Date;
  winnerId: string;
  User: userInformation;
  opponent: userInformation;
}