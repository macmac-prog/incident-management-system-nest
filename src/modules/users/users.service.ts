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

  async createUserData(createUserDto: CreateUserDto): Promise<any> {
    const user = await this.prisma.$transaction(async (prisma) => {
      const hashedPassword = await this.hashPassword(createUserDto.password);

      const {
        email,
        firstName,
        lastName,
        middleName,
        address,
        phoneNumber,
        ...userData
      } = createUserDto;

      // Create the UserLogin record
      const userLogin = await prisma.userLogin.create({
        data: {
          username: userData.username,
          password: hashedPassword,
        },
      });

      const { username, password, rememberToken, confirmPassword, ...userDetailsData } =
        createUserDto;

      // Create the UserDetail record associated with the UserLogin
      const userDetail = await prisma.userDetail.create({
        data: {
          ...userDetailsData,
          user: {
            connect: {
              id: userLogin.id,
            },
          },
        },
      });

      return { userLogin, userDetail };
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
