import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/modules/prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  getAll(): Promise<any[]> {
    return this.prisma.userLogin.findMany({
      include: {
        user: true,
      },
    });
  }
}
