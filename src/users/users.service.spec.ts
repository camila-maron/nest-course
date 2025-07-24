// Import NestJS testing utilities
import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';

// Test suite for UsersService
describe('UsersService', () => {
  let service: UsersService;

  // Runs before each test, sets up the testing module
  beforeEach(async () => {
    // Create a testing module with UsersService as a provider
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService],
    }).compile();

    // Retrieve the UsersService instance from the testing module
    service = module.get<UsersService>(UsersService);
  });

  // Basic test to check if the service is defined
  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
