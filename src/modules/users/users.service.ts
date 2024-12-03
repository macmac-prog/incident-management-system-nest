import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../modules/prisma/prisma.service';
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

  async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
  }

  async create(
    createUserDto: CreateUserDto,
    createUserDetailsDto: CreateUserDetailsDto,
  ): Promise<any> {
    return this.prisma.$transaction(async (prisma) => {
      const hashedPassword = await this.hashPassword(createUserDto.password);

      const { confirmPassword, ...userData } = createUserDto;

      // Create the UserLogin record
      const userLogin = await prisma.userLogin.create({
        data: {
          ...userData,
          password: hashedPassword,
        },
      });

      // Create the UserDetail record associated with the UserLogin

      return { userLogin };
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
    return this.prisma.userDetail.findUnique({
      where: {
        email: email,
      },
    });
  }
}
