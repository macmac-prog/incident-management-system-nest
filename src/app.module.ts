import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './common/guards/roles.guard';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { PrismaModule } from './modules/prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { IsUnique } from './common/pipes/is-unique.validator';
import { CategoryModule } from './modules/category/category.module';
import { IncidentReportsModule } from './modules/incident-reports/incident-reports.module';

@Module({
  imports: [ConfigModule.forRoot(), AuthModule, UsersModule, PrismaModule, CategoryModule, IncidentReportsModule],
  controllers: [AppController],
  providers: [
    AppService,
    IsUnique,
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
