// Import necessary NestJS decorators and services
import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

// @Controller decorator marks this class as a controller
@Controller()
export class AppController {
  // Inject AppService via the constructor
  constructor(private readonly appService: AppService) {}

  @Get() // decorator maps this method to GET /
  getHello(): string {
    // Delegate to the AppService to get the response
    return this.appService.getHello();
  }
}
