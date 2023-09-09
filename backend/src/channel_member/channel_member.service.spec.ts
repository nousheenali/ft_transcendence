import { Test, TestingModule } from '@nestjs/testing';
import { ChannelMemberService } from './channel_member.service';

describe('ChannelMemberService', () => {
  let service: ChannelMemberService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ChannelMemberService],
    }).compile();

    service = module.get<ChannelMemberService>(ChannelMemberService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
