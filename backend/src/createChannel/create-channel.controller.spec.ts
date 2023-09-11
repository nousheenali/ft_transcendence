import { Test, TestingModule } from '@nestjs/testing';
import { CreateChannelController } from './create-channel.controller';
import { CreateChannelService } from './create-channel.service';

describe('CreateChannelController', () => {
  let controller: CreateChannelController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CreateChannelController],
      providers: [CreateChannelService],
    }).compile();

    controller = module.get<CreateChannelController>(CreateChannelController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
