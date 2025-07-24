// Import CanActivate interface and ExecutionContext from NestJS
import { CanActivate, ExecutionContext } from '@nestjs/common';

// AdminGuard is a custom guard that implements CanActivate
// Used to restrict access to admin-only routes
export class AdminGuard implements CanActivate {
  // canActivate is called before the route handler
  canActivate(context: ExecutionContext) {
    // Get the request object from the execution context
    const request = context.switchToHttp().getRequest();

    // Deny access if there is no currentUser on the request
    if (!request.currentUser) {
      return false;
    }

    // Allow access only if the current user is an admin
    return request.currentUser.admin;
  }
}
