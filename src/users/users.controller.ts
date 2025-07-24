// Import necessary NestJS decorators and utilities for controllers and routing
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
  Session,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto'; // DTO for creating users
import { UpdateUserDto } from './dtos/update-user.dto'; // DTO for updating users
import { UsersService } from './users.service'; // Service for user business logic
import { Serialize } from '../interceptors/serialize.interceptor'; // Custom response serialization
import { UserDto } from '../users/dtos/user.dto'; // DTO for serializing user responses
import { AuthService } from './auth.service'; // Service for authentication logic
import { CurrentUser } from './decorators/current-user.decorator'; // Custom decorator to get current user
import { User } from '../entities/user.entity'; // User entity
import { AuthGuard } from '../guards/auth.guard'; // Custom guard for authentication

// @Controller decorator defines a controller and its route prefix
@Controller('auth')
// @Serialize decorator automatically serializes responses using UserDto
@Serialize(UserDto)
export class UsersController {
  // Inject UsersService and AuthService via the constructor
  constructor(
    private usersService: UsersService,
    private authService: AuthService,
  ) {}

  // Route to get the currently authenticated user
  @Get('/whoami') // maps to GET /auth/whoami
  @UseGuards(AuthGuard) // protects the route with authentication
  whoAmI(@CurrentUser() user: User) {
    return user;
  }

  // Route to sign out the user (clears session)
  @Post('/signout')
  signout(@Session() session: any) {
    session.userId = null;
  }

  // Route to sign up a new user
  @Post('/signup') // maps to POST /auth/signup
  async createUser(@Body() body: CreateUserDto, @Session() session: any) {
    const user = await this.authService.signup(body.email, body.password);
    session.userId = user.id;
    return user;
  }

  // Route to sign in a user
  @Post('/signin') // maps to POST /auth/signin
  async signin(@Body() body: CreateUserDto, @Session() session: any) {
    const user = await this.authService.signin(body.email, body.password);
    session.userId = user.id;
    return user;
  }

  // Route to find a user by id
  @Get('/:id') // maps to GET /auth/:id
  async findUser(@Param('id') id: string) {
    console.log('Handler is running');
    const user = await this.usersService.findOne(parseInt(id));

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  // Route to find all users by email
  @Get() // maps to GET /auth?email=...
  findAllUsers(@Param('email') email: string) {
    return this.usersService.find(email);
  }

  // Route to delete a user by id
  @Delete('/:id') // maps to DELETE /auth/:id
  removeUser(@Param('id') id: string) {
    return this.usersService.remove(parseInt(id));
  }

  // Route to update a user by id
  @Patch('/:id') // maps to PATCH /auth/:id
  updateUser(@Param('id') id: string, @Body() body: UpdateUserDto) {
    return this.usersService.update(parseInt(id), body);
  }
}
