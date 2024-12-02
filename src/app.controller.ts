import { Controller, Get, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { UserRoles } from '@prisma/client';
import { RolesGuard } from './Role/roles.guard';
import { Roles } from './Role/roles.decorator';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @UseGuards(RolesGuard)
  @Roles(UserRoles.USER)
  getHello(): string {
    return this.appService.getHello();
  }
}
