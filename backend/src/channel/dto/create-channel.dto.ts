import { ApiProperty } from '@nestjs/swagger';
import {
  IsInt,
  IsDate,
  IsOptional,
  IsString,
  Contains,
  IsNotEmpty,
  Length,
  Matches,
} from 'class-validator';

/**
 * The data transfer object (DTO) that represents the data sent to create a new channel relation.
 */

enum Type {
  PUBLIC,
  PRIVATE,
}

export class CreateChannelDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'channelName must not be empty' })
  @Matches(/^[a-zA-Z0-9]+$/, {
    message: 'channelName must contain only letters and numbers',
  })
  @Length(4, 20, { message: 'channelName must be between 4 and 20 characters' })
  channelName: string;

  @ApiProperty()
  channelType: Type;

  @ApiProperty()
  createdBy: string;

  @ApiProperty()
  channelPassword: string | null;
}
