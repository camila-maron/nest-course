// Import validation decorators from class-validator
import {
  IsString,
  IsNumber,
  Min,
  Max,
  IsLongitude,
  IsLatitude,
} from 'class-validator';

// DTO (Data Transfer Object) for creating a new report
// Used to validate and type-check incoming request bodies
export class CreateReportDto {
  // Price must be a number between 0 and 1,000,000
  @IsNumber()
  @Min(0)
  @Max(1000000)
  price: number;

  // Car make must be a string
  @IsString()
  make: string;

  // Car model must be a string
  @IsString()
  model: string;

  // Year must be a number between 1930 and 2050
  @IsNumber()
  @Min(1930)
  @Max(2050)
  year: number;

  // Longitude must be a valid longitude number
  @IsLongitude()
  lng: number;

  // Latitude must be a valid latitude number
  @IsLatitude()
  lat: number;

  // Mileage must be a number between 0 and 1,000,000
  @IsNumber()
  @Min(0)
  @Max(1000000)
  mileage: number;
}
