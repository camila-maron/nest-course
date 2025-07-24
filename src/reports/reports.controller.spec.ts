// Import NestJS testing utilities
import { Test, TestingModule } from '@nestjs/testing';
// Import the controller to be tested
import { ReportsController } from './reports.controller';

// Test suite for ReportsController
describe('ReportsController', () => {
  let controller: ReportsController;

  // Runs before each test, sets up the testing module
  beforeEach(async () => {
    // Create a testing module with ReportsController as a controller
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReportsController],
    }).compile();

    // Retrieve the ReportsController instance from the testing module
    controller = module.get<ReportsController>(ReportsController);
  });

  // Basic test to check if the controller is defined
  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
