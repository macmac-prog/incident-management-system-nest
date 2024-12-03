import { PartialType } from '@nestjs/mapped-types';
import { CreateIncidentReportDto } from './create-incident-report.dto';

export class UpdateIncidentReportDto extends PartialType(CreateIncidentReportDto) {}
