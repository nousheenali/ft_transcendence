import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsDate, IsOptional, IsString } from 'class-validator';

/**
 * The data transfer object (DTO) that represents the data sent to create a new channel relation.
 */
export class CreateChannelRelationDto {
  @ApiProperty()
  @IsString()
  userId: string;

  @ApiProperty()
  @IsString()
  channelId: string;
}
