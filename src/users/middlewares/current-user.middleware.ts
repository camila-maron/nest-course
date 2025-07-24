// Import necessary NestJS and Express modules for creating middleware
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { UsersService } from '../users.service';
import { User } from '../../entities/user.entity';

// Extend Express's Request interface to include currentUser
declare global {
  namespace Express {
    interface Request {
      currentUser: User | null;
    }
  }
}

// @Injectable() marks this class as a provider that can be injected
@Injectable()
// Custom middleware to attach the current user to the request object
export class CurrentUserMiddleware implements NestMiddleware {
  // Inject UsersService to fetch user data
  constructor(private usersService: UsersService) {}

  // The use() method is called for every request
  async use(req: Request, res: Response, next: NextFunction) {
    // Extract userId from the session (if present)
    const { userId } = req.session || {};

    if (userId) {
      // Fetch the user from the database and attach to the request
      const user = await this.usersService.findOne(userId);
      req.currentUser = user;
    }

    // Call next() to pass control to the next middleware or route handler
    next();
  }
}
