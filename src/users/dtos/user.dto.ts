// Import decorator for exposing properties from class-transformer
import { Expose } from 'class-transformer';

// DTO (Data Transfer Object) for serializing user responses
// Used with class-transformer to control which properties are sent to the client
export class UserDto {
  // Expose the id property in the response
  @Expose()
  id: number;

  // Expose the email property in the response
  @Expose()
  email: string;
}
