import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { IncidentReportsService } from './incident-reports.service';
import { CreateIncidentReportDto } from './dto/create-incident-report.dto';
import { UpdateIncidentReportDto } from './dto/update-incident-report.dto';

@Controller('incident-reports')
export class IncidentReportsController {
  constructor(private readonly incidentReportsService: IncidentReportsService) {}

  @Post()
  create(@Body() createIncidentReportDto: CreateIncidentReportDto) {
    return this.incidentReportsService.create(createIncidentReportDto);
  }

  @Get()
  findAll() {
    return this.incidentReportsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.incidentReportsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateIncidentReportDto: UpdateIncidentReportDto) {
    return this.incidentReportsService.update(+id, updateIncidentReportDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.incidentReportsService.remove(+id);
  }
}
