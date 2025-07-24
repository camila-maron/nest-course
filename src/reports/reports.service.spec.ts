// Import NestJS testing utilities
import { Test, TestingModule } from '@nestjs/testing';
// Import the service to be tested
import { ReportsService } from './reports.service';

// Test suite for ReportsService
describe('ReportsService', () => {
  let service: ReportsService;

  // Runs before each test, sets up the testing module
  beforeEach(async () => {
    // Create a testing module with ReportsService as a provider
    const module: TestingModule = await Test.createTestingModule({
      providers: [ReportsService],
    }).compile();

    // Retrieve the ReportsService instance from the testing module
    service = module.get<ReportsService>(ReportsService);
  });

  // Basic test to check if the service is defined
  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
