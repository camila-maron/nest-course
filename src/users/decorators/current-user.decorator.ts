// Import createParamDecorator and ExecutionContext from NestJS
import { createParamDecorator, ExecutionContext } from '@nestjs/common';

// Custom parameter decorator to extract the current user from the request
// Usage: @CurrentUser() user: User
export const CurrentUser = createParamDecorator(
  (data: never, context: ExecutionContext) => {
    // Get the request object from the execution context
    const request = context.switchToHttp().getRequest();
    // Return the currentUser property set by middleware/interceptor
    return request.currentUser;
  },
);
