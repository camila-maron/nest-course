// Import the Report entity for the relationship
import { Report } from './report.entity';
// Import TypeORM decorators for defining the entity, columns, and hooks
import {
  AfterInsert,
  AfterUpdate,
  AfterRemove,
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
} from 'typeorm';

// @Entity decorator marks this class as a database entity for TypeORM
@Entity()
export class User {
  // Primary key, auto-generated
  @PrimaryGeneratedColumn()
  id: number;

  // User's email address
  @Column()
  email: string;

  // User's hashed password
  @Column()
  password: string;

  // Whether the user is an admin (default: true)
  @Column({ default: true })
  admin: boolean;

  // One user can have many reports
  @OneToMany(() => Report, (report) => report.user)
  reports: Report[];

  // Lifecycle hook: runs after a user is inserted
  @AfterInsert()
  logInsert() {
    console.log('Inserted User with ID: ', this.id);
  }

  // Lifecycle hook: runs after a user is updated
  @AfterUpdate()
  logUpdate() {
    console.log('Updated User with ID: ', this.id);
  }

  // Lifecycle hook: runs after a user is removed
  @AfterRemove()
  logRemove() {
    console.log('Removed User with ID: ', this.id);
  }
}
