// Import the @Module decorator to define a NestJS module
import { Module, MiddlewareConsumer } from '@nestjs/common';
import { UsersController } from './users.controller'; // Controller for user routes
import { UsersService } from './users.service'; // Service for user business logic
import { TypeOrmModule } from '@nestjs/typeorm'; // TypeORM integration
import { User } from '../entities/user.entity'; // User entity for TypeORM
import { AuthService } from './auth.service'; // Service for authentication logic
import { CurrentUserMiddleware } from './middlewares/current-user.middleware'; // Middleware to attach current user

// @Module decorator defines the metadata for the UsersModule
@Module({
  imports: [TypeOrmModule.forFeature([User])], // Register the User entity for dependency injection
  controllers: [UsersController], // Register the controller
  providers: [UsersService, AuthService], // Register the services as providers
})
export class UsersModule {
  // Configure method to apply middleware to all routes in this module
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CurrentUserMiddleware).forRoutes('*');
  }
}
