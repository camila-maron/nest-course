// Import validation decorators from class-validator and transformation from class-transformer
import {
  IsString,
  IsNumber,
  Min,
  Max,
  IsLongitude,
  IsLatitude,
} from 'class-validator';
import { Transform } from 'class-transformer';

// DTO (Data Transfer Object) for getting an estimate
// Used to validate and transform incoming query parameters
export class GetEstimateDto {
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
  @Transform(({ value }) => parseInt(value))
  year: number;

  // Longitude must be a valid longitude number
  @IsLongitude()
  @Transform(({ value }) => parseFloat(value))
  lng: number;

  // Latitude must be a valid latitude number
  @IsLatitude()
  @Transform(({ value }) => parseFloat(value))
  lat: number;

  // Mileage must be a number between 0 and 1,000,000
  @IsNumber()
  @Min(0)
  @Max(1000000)
  @Transform(({ value }) => parseInt(value))
  mileage: number;
}
