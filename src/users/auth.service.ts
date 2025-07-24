// Import necessary NestJS modules and utilities for authentication
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UsersService } from './users.service'; // Service for user management
import { randomBytes, scrypt as _scrypt } from 'crypto'; // For password hashing
import { promisify } from 'util';

// Promisify scrypt for async/await usage
const scrypt = promisify(_scrypt);

// @Injectable() marks this class as a provider that can be injected
@Injectable()
export class AuthService {
  // Inject UsersService to manage users
  constructor(private usersService: UsersService) {}

  // Sign up a new user with email and password
  async signup(email: string, password: string) {
    // Check if the email is already in use
    const users = await this.usersService.find(email);

    if (users.length) {
      throw new BadRequestException('Email in use');
    }

    // Generate a salt and hash the password
    const salt = randomBytes(8).toString('hex');
    const hash = (await scrypt(password, salt, 32)) as Buffer;
    const result = `${salt}.${hash.toString('hex')}`;

    // Create the user with the hashed password
    const user = await this.usersService.create(email, result);
    return user;
  }

  // Sign in a user by verifying email and password
  async signin(email: string, password: string) {
    // Find the user by email
    const [user] = await this.usersService.find(email);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Split the stored password into salt and hash
    const [salt, storedHash] = user.password.split('.');
    // Hash the provided password with the same salt
    const hash = (await scrypt(password, salt, 32)) as Buffer;

    // Compare the hashes
    if (storedHash !== hash.toString('hex')) {
      throw new BadRequestException('Bad password');
    }

    return user;
  }
}
