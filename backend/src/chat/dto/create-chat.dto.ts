import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, IsOptional } from "class-validator";

export class CreateChatDto {
  
	@ApiProperty()
	@IsNotEmpty({ message: "The 'socketId' property is required."})
	@IsString({ message: "The 'socketId' property must be a string."})
	socketId: string;

	@ApiProperty()
	@IsNotEmpty({ message: "The 'sender' property is required."})
	@IsString({ message: "The 'sender' property must be a string."})
	sender: string;

	@ApiProperty()
	@IsString({ message: "The 'receiver' property must be a string."})
	@IsOptional()
	receiver?: string;

	@ApiProperty()
	@IsString({ message: "The 'channel' property must be a string."})
	@IsOptional()
	channel?: string;

	@ApiProperty()
	@IsString({ message: "The 'channelType' property must be a string."})
	@IsOptional()
	channelType?: string;


	@ApiProperty()
	@IsNotEmpty({ message: "The 'message' property is required."})
	message: string;
}