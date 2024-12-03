import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../modules/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { CreateUserDetailsDto } from './dto/create-userDetails.dto';
import * as bcrypt from 'bcrypt';
import { UserLogin, Role, UserRoles } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  getAll(): Promise<UserLogin[]> {
    return this.prisma.userLogin.findMany({
      include: {
        user: true,
        roles: true,
        teams: true,
      },
    });
  }

  async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
  }

  async createUserData(createUserDto: CreateUserDto): Promise<any> {
    const user = await this.prisma.$transaction(async (prisma) => {
      const hashedPassword = await this.hashPassword(createUserDto.password);

      const {
        username,
        password,
        rememberToken,
        confirmPassword,
        ...userDetailsData
      } = createUserDto;

      const userRole = await prisma.role.findFirst({
        where: { name: UserRoles.USER },
      });

      // Create the UserLogin record
      const userLogin = await prisma.userLogin.create({
        data: {
          username: username,
          password: hashedPassword,
          roles: {
            connect: {
              id: userRole.id,
            },
          },
          user: {
            create: {
              ...userDetailsData,
            },
          },
        },
      });

      return { userLogin };
    });

    return user;
  }

  findById(id: number): Promise<any> {
    return this.prisma.userLogin.findUnique({
      where: {
        id,
      },
      include: {
        user: true,
        roles: true,
        teams: true,
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
        roles: true,
        teams: true,
      },
    });
  }

  findByEmail(email: string): Promise<any> {
    return this.prisma.userDetail.findUnique({
      where: {
        email: email,
      },
    });
  }
}
