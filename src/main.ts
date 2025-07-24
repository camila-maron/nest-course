// NestFactory is used to create a NestJS application instance
import { NestFactory } from '@nestjs/core';
// AppModule is the root module of the application
import { AppModule } from './app.module';

// The bootstrap function is the entry point of the NestJS application
async function bootstrap() {
  // Create the NestJS application using the root module
  const app = await NestFactory.create(AppModule);
  // Start listening for HTTP requests on the specified port (default 3000)
  await app.listen(process.env.PORT ?? 3000);
}

// Start the application
bootstrap();
