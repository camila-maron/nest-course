// Import the User entity for the relationship
import { User } from './user.entity';
// Import TypeORM decorators for defining the entity and its columns
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

// @Entity decorator marks this class as a database entity for TypeORM
@Entity()
export class Report {
  // Primary key, auto-generated
  @PrimaryGeneratedColumn()
  id: number;

  // Price of the report item
  @Column()
  price: number;

  // Car make
  @Column()
  make: string;

  // Car model
  @Column()
  model: string;

  // Year of the car
  @Column()
  year: number;

  // Longitude
  @Column()
  lng: number;

  // Latitude
  @Column()
  lat: number;

  // Mileage of the car
  @Column()
  mileage: number;

  // Whether the report is approved (default: false)
  @Column({ default: false })
  approved: boolean;

  // Many reports can belong to one user
  @ManyToOne(() => User, (user) => user.reports)
  user: User;
}
