// Import validation decorators from class-validator
import { IsEmail, IsString } from 'class-validator';

// DTO (Data Transfer Object) for creating a new user
// Used to validate and type-check incoming request bodies
export class CreateUserDto {
  // Email must be a valid email address
  @IsEmail()
  email: string;

  // Password must be a string
  @IsString()
  password: string;
}
