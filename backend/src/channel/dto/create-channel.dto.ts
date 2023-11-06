import { ApiProperty } from '@nestjs/swagger';
import {
  IsInt,
  IsDate,
  IsOptional,
  IsString,
  Contains,
  IsNotEmpty,
  Length,
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
  @IsString({ message: 'channelName must be a string' })
  @Contains(' ', { message: 'channelName must not contain spaces' })
  @IsNotEmpty({ message: 'channelName must not be empty' })
  @Length(4, 20)
  channelName: string;

  @ApiProperty()
  channelType: Type;

  @ApiProperty()
  createdBy: string;

  password: string | null;
}
