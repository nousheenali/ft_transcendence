
import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsDate, IsOptional } from 'class-validator';

/**
 * The data transfer object (DTO) that represents the data sent to create a new channel relation.
 */

enum Type {
    PUBLIC,
    PRIVATE
}

export class CreateChannelDto {
    @ApiProperty()
    channelName: string | null;

    @ApiProperty()
    channelType: Type;

    @ApiProperty()
    @IsOptional()
    createdBy: number;

}
