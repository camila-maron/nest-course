// Import necessary NestJS and TypeORM modules for creating a service
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Report } from '../entities/report.entity';
import { CreateReportDto } from './dtos/create-report.dto';
import { User } from '../entities/user.entity';
import { GetEstimateDto } from './dtos/get-estimate.dto';

// @Injectable() marks this class as a provider that can be injected
@Injectable()
export class ReportsService {
  // Inject the Report repository for database operations
  constructor(@InjectRepository(Report) private repo: Repository<Report>) {}

  // Create a new report and associate it with a user
  create(reportDto: CreateReportDto, user: User) {
    const report = this.repo.create(reportDto);
    report.user = user;
    return this.repo.save(report);
  }

  // Change the approval status of a report
  async changeApproval(id: string, approved: boolean) {
    // Find the report by id
    const report = await this.repo.findOne({ where: { id: parseInt(id) } });

    if (!report) {
      // Throw a 404 error if not found
      throw new NotFoundException('Report not found');
    }

    // Update the approval status and save
    report.approved = approved;
    return this.repo.save(report);
  }

  // Create an estimate based on provided criteria
  createEstimate({ make, model, lat, lng, year, mileage }: GetEstimateDto) {
    // Use a query builder to calculate the average price of similar reports
    return this.repo
      .createQueryBuilder()
      .select('AVG(price)', 'price')
      .where('make = :make', { make })
      .andWhere('model = :model', { model })
      .andWhere('lng - :lng BETWEEN -5 and 5', { lng })
      .andWhere('lat - :lat BETWEEN -5 and 5', { lat })
      .andWhere('year - :year BETWEEN -3 and 3', { year })
      .andWhere('approved IS TRUE')
      .orderBy('ABS(mileage - :mileage)', 'DESC')
      .setParameters({ mileage })
      .limit(3)
      .getRawOne();
  }
}
