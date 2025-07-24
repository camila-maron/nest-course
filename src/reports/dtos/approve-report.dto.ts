// Import validation decorator from class-validator
import { IsBoolean } from 'class-validator';

// DTO (Data Transfer Object) for approving a report
// Used to validate the 'approved' property in the request body
export class ApproveReportDto {
  // Indicates whether the report is approved (must be boolean)
  @IsBoolean()
  approved: boolean;
}
