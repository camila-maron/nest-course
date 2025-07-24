// Import decorators for exposing and transforming properties from class-transformer
import { Expose, Transform } from 'class-transformer';

// DTO (Data Transfer Object) for serializing report responses
// Used with class-transformer to control which properties are sent to the client
export class ReportDto {
  // Expose the id property in the response
  @Expose()
  id: number;

  // Expose the price property in the response
  @Expose()
  price: number;

  // Expose the make property in the response
  @Expose()
  make: string;

  // Expose the model property in the response
  @Expose()
  model: string;

  // Expose the year property in the response
  @Expose()
  year: number;

  // Expose the longitude property in the response
  @Expose()
  lng: number;

  // Expose the latitude property in the response
  @Expose()
  lat: number;

  // Expose the mileage property in the response
  @Expose()
  mileage: number;

  // Transform the user property to expose only the user id as userId
  @Transform(({ obj }) => obj.user.id)
  @Expose()
  userId: number;
}
