// Import necessary NestJS and TypeORM modules for creating a service
import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';

// @Injectable() marks this class as a provider that can be injected
@Injectable()
export class UsersService {
  // Inject the User repository for database operations
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  // Create a new user with the given email and password
  create(email: string, password: string) {
    const user = this.repo.create({ email, password });
    return this.repo.save(user);
  }

  // Find a user by id
  findOne(id: number) {
    if (!id) {
      return null;
    }
    return this.repo.findOneBy({ id });
  }

  // Find all users with a given email
  find(email: string) {
    return this.repo.find({ where: { email } });
  }

  // Update a user by id with the given attributes
  async update(id: number, attrs: Partial<User>) {
    const user = await this.findOne(id);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    Object.assign(user, attrs);
    return this.repo.save(user);
  }

  // Remove a user by id
  async remove(id: number) {
    const user = await this.findOne(id);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return this.repo.remove(user);
  }
}
