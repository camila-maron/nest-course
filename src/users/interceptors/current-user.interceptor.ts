// Import necessary NestJS modules for creating interceptors
import {
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Injectable,
} from '@nestjs/common';
import { UsersService } from '../users.service';

// NOTE: This interceptor is not currently used; current-user.middleware.ts is used instead

// @Injectable() marks this class as a provider that can be injected
@Injectable()
export class CurrentUserInterceptor implements NestInterceptor {
  // Inject UsersService to fetch user data
  constructor(private usersService: UsersService) {}

  // Intercept incoming requests to attach the current user to the request object
  async intercept(context: ExecutionContext, next: CallHandler<any>) {
    // Get the request object from the execution context
    const request = context.switchToHttp().getRequest();
    // Extract userId from the session (if present)
    const { userId } = request.session || {};

    if (userId) {
      // Fetch the user from the database and attach to the request
      const user = await this.usersService.findOne(userId);
      request.currentUser = user;
    }

    // Continue to the next handler in the request pipeline
    return next.handle();
  }
}
