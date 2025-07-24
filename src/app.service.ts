// The @Injectable() decorator marks this class as a provider that can be injected as a dependency
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  // Example service method
  getHello(): string {
    return 'Hello World!';
  }
}
