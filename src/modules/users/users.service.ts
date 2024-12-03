import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/modules/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { CreateUserDetailsDto } from './dto/create-userDetails.dto';
import * as bcrypt from 'bcrypt';
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

  async create(
    createUserDto: CreateUserDto,
    createUserDetailsDto: CreateUserDetailsDto,
  ): Promise<any> {
    return this.prisma.$transaction(async (prisma) => {
      const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

      // Create the UserLogin record
      const userLogin = await prisma.userLogin.create({
        data: {
          ...createUserDto,
          password: hashedPassword,
        },
      });

      // Create the UserDetail record associated with the UserLogin
      const userDetail = await prisma.userDetail.create({
        data: {
          ...createUserDetailsDto,
          user: {
            connect: {
              id: userLogin.id,
            },
          },
        },
      });

      return { userLogin, userDetail };
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
