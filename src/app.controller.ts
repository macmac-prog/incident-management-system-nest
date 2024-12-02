import { Controller, Get, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { UserRoles } from '@prisma/client';
import { RolesGuard } from './common/guards/roles.guard';
import { Roles } from './common/decorator/roles.decorator';

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
