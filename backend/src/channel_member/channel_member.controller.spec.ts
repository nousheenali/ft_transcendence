import { Test, TestingModule } from '@nestjs/testing';
import { ChannelMemberController } from './channel_member.controller';
import { ChannelMemberService } from './channel_member.service';

describe('ChannelMemberController', () => {
  let controller: ChannelMemberController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ChannelMemberController],
      providers: [ChannelMemberService],
    }).compile();

    controller = module.get<ChannelMemberController>(ChannelMemberController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
