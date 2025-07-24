// Import CanActivate interface and ExecutionContext from NestJS
import { CanActivate, ExecutionContext } from '@nestjs/common';

// AuthGuard is a custom guard that implements CanActivate
// Guards are used to determine whether a request will be handled by the route handler
export class AuthGuard implements CanActivate {
  // canActivate is called before the route handler
  canActivate(context: ExecutionContext) {
    // Get the request object from the execution context
    const request = context.switchToHttp().getRequest();
    // Allow access if there is a userId in the session (i.e., user is authenticated)
    return request.session.userId;
  }
}
