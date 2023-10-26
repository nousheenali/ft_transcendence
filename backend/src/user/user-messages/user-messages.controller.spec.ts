import { Test, TestingModule } from '@nestjs/testing';
import { UserMessagesController } from './user-messages.controller';
import { UserMessagesService } from './user-messages.service';

describe('UserMessagesController', () => {
  let controller: UserMessagesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserMessagesController],
      providers: [UserMessagesService],
    }).compile();

    controller = module.get<UserMessagesController>(UserMessagesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
