import { Test, TestingModule } from '@nestjs/testing';
import { CreateChannelService } from './create-channel.service';

describe('CreateChannelService', () => {
  let service: CreateChannelService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CreateChannelService],
    }).compile();

    service = module.get<CreateChannelService>(CreateChannelService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
