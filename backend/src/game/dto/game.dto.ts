import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";
import { GameStatus } from '@prisma/client'; //importing enum declared in prisma schema

export class GameDto {
  @ApiProperty()
  @IsNotEmpty()
  userLogin: string;

  @ApiProperty()
  @IsNotEmpty()
  opponentLogin: string;

  gameStatus: GameStatus
}
