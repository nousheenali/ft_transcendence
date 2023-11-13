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
};