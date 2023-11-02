import { IsNotEmpty, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateUserMessageDto {
	@ApiProperty()
	@IsString()
	@IsNotEmpty()
	senderId: string;

	@ApiProperty()
	@IsString()
	@IsNotEmpty()
	receiverId: string;
	
	@ApiProperty()
	@IsString()
	@IsNotEmpty()
	content: string;
}
