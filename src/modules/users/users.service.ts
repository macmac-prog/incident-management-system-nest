import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UserLogin } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  getAll(): Promise<UserLogin[]> {
    return this.prisma.userLogin.findMany({
      include: {
        user: true,
      },
    });
  }

  findById(id: number): Promise<any> {
    return this.prisma.userLogin.findUnique({
      where: {
        id,
      },
      include: {
        user: true,
      },
    });
  }

  findByUsername(username: string): Promise<any> {
    return this.prisma.userLogin.findUnique({
      where: {
        username: username,
      },
      include: {
        user: true,
      },
    });
  }

  findByEmail(email: string): Promise<any> {
    return this.prisma.userLogin.findFirst({
      where: {
        user: {
          email: email,
        },
      },
      include: {
        user: true,
      },
    });
  }
}
