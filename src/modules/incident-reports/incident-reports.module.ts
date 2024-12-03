import { Module } from '@nestjs/common';
import { IncidentReportsService } from './incident-reports.service';
import { IncidentReportsController } from './incident-reports.controller';

@Module({
  controllers: [IncidentReportsController],
  providers: [IncidentReportsService],
})
export class IncidentReportsModule {}
