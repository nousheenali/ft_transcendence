import { Test, TestingModule } from '@nestjs/testing';
import { UserMessagesService } from './user-messages.service';

describe('UserMessagesService', () => {
  let service: UserMessagesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserMessagesService],
    }).compile();

    service = module.get<UserMessagesService>(UserMessagesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
