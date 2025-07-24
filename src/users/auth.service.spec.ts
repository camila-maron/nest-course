// Import NestJS testing utilities and dependencies
import { Test } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from './users.service';
import { User } from '../entities/user.entity';
import { BadRequestException, NotFoundException } from '@nestjs/common';

// Test suite for AuthService
describe('AuthService', () => {
  let service: AuthService;
  let fakeUsersService: Partial<UsersService>;

  // Runs before each test, sets up the testing module and mocks
  beforeEach(async () => {
    // In-memory array to simulate users database
    const users: User[] = [];
    // Mock UsersService with fake implementations
    fakeUsersService = {
      find: (email: string) => {
        const filteredUsers = users.filter((user) => user.email === email);
        return Promise.resolve(filteredUsers);
      },
      create: (email: string, password: string) => {
        const user = {
          id: Math.floor(Math.random() * 999999),
          email,
          password,
        } as User;
        users.push(user);
        return Promise.resolve(user);
      },
    };

    // Create a testing module with AuthService and the mocked UsersService
    const module = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsersService,
          useValue: fakeUsersService,
        },
      ],
    }).compile();

    // Retrieve the AuthService instance from the testing module
    service = module.get(AuthService);
  });

  // Test that the AuthService instance is created
  it('can create an instance of auth service', async () => {
    expect(service).toBeDefined();
  });

  // Test that signup creates a new user with a salted and hashed password
  it('creates a new user with a salted and hashed password', async () => {
    const user = await service.signup('test@test.com', 'Pass1234!');
    const [salt, hash] = user.password.split('.');

    // The stored password should not be the plain password
    expect(user.password).not.toEqual('Pass1234!');
    // The salt and hash should both be defined
    expect(salt).toBeDefined();
    expect(hash).toBeDefined();
  });

  // Test that signup throws an error if the email is already in use
  it('throws an error if user signs up with email that is in use', async () => {
    await service.signup('test@test.com', 'Pass1234!');

    await expect(service.signup('test@test.com', 'Pass1234!')).rejects.toThrow(
      BadRequestException,
    );
  });

  // Test that signin throws if called with an unused email
  it('throws if signin is called with an unused email', async () => {
    await expect(service.signin('test@test.com', 'Pass1234!')).rejects.toThrow(
      NotFoundException,
    );
  });

  // Test that signin throws if an invalid password is provided
  it('throws if an invalid password is provided', async () => {
    await service.signup('test@test.com', 'Pass1234!');

    await expect(service.signin('test@test.com', '1234Pass!')).rejects.toThrow(
      BadRequestException,
    );
  });

  // Test that signin returns a user if the correct password is provided
  it('returns a user if correct password is provided', async () => {
    await service.signup('test@test.com', 'Pass1234!');
    const user = await service.signin('test@test.com', 'Pass1234!');

    expect(user).toBeDefined();
  });
});
