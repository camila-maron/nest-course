// Import the @Module decorator to define a NestJS module
import { Module } from '@nestjs/common';
import { ReportsController } from './reports.controller'; // Controller for reports routes
import { ReportsService } from './reports.service'; // Service for business logic
import { TypeOrmModule } from '@nestjs/typeorm'; // TypeORM integration
import { Report } from '../entities/report.entity'; // Report entity for TypeORM

// @Module decorator defines the metadata for the ReportsModule
@Module({
  controllers: [ReportsController], // Register the controller
  providers: [ReportsService], // Register the service as a provider
  imports: [TypeOrmModule.forFeature([Report])], // Register the Report entity for dependency injection
})
export class ReportsModule {}
