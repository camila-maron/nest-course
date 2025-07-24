// The root module of the application, decorated with @Module
import { MiddlewareConsumer, Module, ValidationPipe } from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';
import { AppController } from './app.controller'; // Main application controller
import { AppService } from './app.service'; // Main application service
import { UsersModule } from './users/users.module'; // Feature module for users
import { ReportsModule } from './reports/reports.module'; // Feature module for reports
import { TypeOrmModule } from '@nestjs/typeorm'; // TypeORM integration for database
const cookieSession = require('cookie-session'); // Middleware for session cookies
import { ConfigModule, ConfigService } from '@nestjs/config'; // Configuration management
const AppDataSource = require('./data-source');

// @Module decorator defines a module and its metadata
@Module({
  imports: [
    // Loads environment variables and makes them available globally
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV}`,
    }),
    UsersModule, // Import Users feature module
    ReportsModule, // Import Reports feature module
    // Asynchronous TypeORM configuration
    TypeOrmModule.forRoot(AppDataSource.options),
  ],
  controllers: [AppController], // Register controllers
  providers: [
    AppService, // Register services/providers
    {
      // Set up a global validation pipe for DTO validation
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        whitelist: true,
      }),
    },
  ],
})
export class AppModule {
  constructor(private configService: ConfigService) {}

  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(
        cookieSession({
          keys: [this.configService.get('COOKIE_KEY')],
        }),
      )
      .forRoutes('*');
  }
}
