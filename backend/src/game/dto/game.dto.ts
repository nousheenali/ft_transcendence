import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class GameDto {
  @ApiProperty()
  @IsNotEmpty()
  userLogin: string;

  @ApiProperty()
  @IsNotEmpty()
  opponentLogin: string;
}
