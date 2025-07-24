// Import NestJS decorators and utilities for controllers and routing
import {
  Controller,
  Post,
  Body,
  UseGuards,
  Patch,
  Param,
  Get,
  Query,
} from '@nestjs/common';
// Import DTOs (Data Transfer Objects) for request validation and typing
import { CreateReportDto } from './dtos/create-report.dto';
import { ReportsService } from './reports.service'; // Service for business logic
import { AuthGuard } from '../guards/auth.guard'; // Custom guard for authentication
import { User } from '../entities/user.entity'; // User entity
import { CurrentUser } from '../users/decorators/current-user.decorator'; // Custom decorator to get current user
import { ReportDto } from './dtos/report.dto'; // DTO for serializing report responses
import { Serialize } from '../interceptors/serialize.interceptor'; // Custom response serialization
import { ApproveReportDto } from './dtos/approve-report.dto'; // DTO for approving reports
import { AdminGuard } from '../guards/admin.guard'; // Custom guard for admin access
import { GetEstimateDto } from './dtos/get-estimate.dto'; // DTO for estimate queries

// @Controller decorator defines a controller and its route prefix
@Controller('reports')
export class ReportsController {
  // Inject the ReportsService via the constructor
  constructor(private reportsService: ReportsService) {}

  // Route to create a new report
  @Post() // maps to HTTP POST /reports
  @UseGuards(AuthGuard) // protects the route with authentication
  @Serialize(ReportDto) // serializes the response using the ReportDto
  createReport(@Body() body: CreateReportDto, @CurrentUser() user: User) {
    return this.reportsService.create(body, user);
  }

  // Route to approve a report (admin only)
  @Patch('/:id') // maps to HTTP PATCH /reports/:id
  @UseGuards(AdminGuard) // restricts access to admins
  approveReport(@Param('id') id: string, @Body() body: ApproveReportDto) {
    return this.reportsService.changeApproval(id, body.approved);
  }

  // Route to get an estimate based on query parameters
  @Get() // maps to HTTP GET /reports
  getEstimate(@Query() query: GetEstimateDto) {
    return this.reportsService.createEstimate(query);
  }
}
