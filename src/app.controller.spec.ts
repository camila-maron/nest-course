// Import NestJS testing utilities and dependencies
import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

// Test suite for AppController
describe('AppController', () => {
  let appController: AppController;

  // Runs before each test, sets up the testing module
  beforeEach(async () => {
    // Create a testing module with AppController and AppService
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    // Retrieve the AppController instance from the testing module
    appController = app.get<AppController>(AppController);
  });

  // Test the root route handler
  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(appController.getHello()).toBe('Hello World!');
    });
  });
});
