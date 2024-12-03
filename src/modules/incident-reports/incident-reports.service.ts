import { Injectable } from '@nestjs/common';
import { CreateIncidentReportDto } from './dto/create-incident-report.dto';
import { UpdateIncidentReportDto } from './dto/update-incident-report.dto';

@Injectable()
export class IncidentReportsService {
  create(createIncidentReportDto: CreateIncidentReportDto) {
    return 'This action adds a new incidentReport';
  }

  findAll() {
    return `This action returns all incidentReports`;
  }

  findOne(id: number) {
    return `This action returns a #${id} incidentReport`;
  }

  update(id: number, updateIncidentReportDto: UpdateIncidentReportDto) {
    return `This action updates a #${id} incidentReport`;
  }

  remove(id: number) {
    return `This action removes a #${id} incidentReport`;
  }
}
