import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UsersService } from '../users/users.service';
import { LoginDto } from './dto/login.dto';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { CreateUserDetailsDto } from '../users/dto/create-userDetails.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private prisma: PrismaService,
    private usersService: UsersService,
    private authService: AuthService,
  ) {}

  @Post('login')
  async login(@Body() LoginDto: LoginDto) {
    const user = await this.authService.validateUser(LoginDto);

    if (!user) {
      throw new HttpException(
        {
          message: 'Invalid credentials',
        },
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    const { accessToken, rememberToken } = await this.authService.login(
      user,
      LoginDto.rememberToken,
    );

    throw new HttpException(
      {
        message: 'Login successful',
        accessToken,
        rememberToken,
      },
      HttpStatus.OK,
    );
  }

  @Post('register')
  async register(
    @Body() createUserDto: CreateUserDto,
    createUserDetailsDto: CreateUserDetailsDto,
  ) {
    const { userLogin, userDetail } = await this.usersService.create(
      createUserDto,
      createUserDetailsDto,
    );
    return { userLogin, userDetail };
  }
}
