import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsDate, IsOptional } from 'class-validator';

/**
 * The data transfer object (DTO) that represents the data sent to create a new channel relation.
 */
export class CreateChannelRelationDto {
	@ApiProperty()
	@IsInt()
	userId: number;

	@ApiProperty()
	@IsOptional()
	@IsInt()
	channelId: number | null;
}
 