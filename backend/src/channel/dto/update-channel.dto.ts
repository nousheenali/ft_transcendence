import { PartialType } from '@nestjs/mapped-types';
import { CreateChannelDto } from './create-channel.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Length, Matches } from 'class-validator';

export class UpdateChannelNameDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'channelName must not be empty' })
  @Matches(/^[a-zA-Z0-9]+$/, {
    message: 'channelName must contain only letters and numbers\n',
  })
  @Length(4, 20, {
    message: 'channelName must be between 4 and 20 characters\n',
  })
  channelName: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'ChannelId must not be empty' })
  channelId: string;
}

export class UpdateChannelPasswordDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'ChannelId must not be empty' })
  channelId: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'channelPassword must not be empty' })
  @Length(4, 20, {
    message: 'channelPassword must be between 4 and 20 characters\n',
  })
  newChannelPassword: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'channelPassword must not be empty' })
  @Length(4, 20, {
    message: 'channelPassword must be between 4 and 20 characters\n',
  })
  oldChannelPassword: string;
}
