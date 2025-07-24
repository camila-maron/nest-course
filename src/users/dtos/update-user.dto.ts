// Import validation decorators from class-validator
import { IsEmail, IsString, IsOptional } from 'class-validator';

// DTO (Data Transfer Object) for updating a user
// Used to validate and type-check incoming request bodies for PATCH requests
export class UpdateUserDto {
  // Email is optional, but if present must be a valid email address
  @IsEmail()
  @IsOptional()
  email: string;

  // Password is optional, but if present must be a string
  @IsString()
  @IsOptional()
  password: string;
}
