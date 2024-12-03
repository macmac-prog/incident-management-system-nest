import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UsersService } from '../users/users.service';
import { LoginDto } from './dto/login.dto';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { CreateUserDetailsDto } from '../users/dto/create-userDetails.dto';
import { AuthUser } from '../../common/decorators/auth-user.decorator';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { SkipThrottle, Throttle } from '@nestjs/throttler';

@SkipThrottle()
@Controller('auth')
export class AuthController {
  constructor(
    private prisma: PrismaService,
    private usersService: UsersService,
    private authService: AuthService,
  ) {}

  @SkipThrottle({ default: false })
  @Throttle({ default: { limit: 2, ttl: 10000 } })
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
      LoginDto.rememberToken || null,
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
  async register(@Body() createUserDto: CreateUserDto) {
    const { userLogin, userDetail } =
      await this.usersService.createUserData(createUserDto);
    return { userLogin, userDetail };
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getProfile(@AuthUser() user: any) {
    throw new HttpException(
      {
        message: 'Profile fetched successfully',
        loginDetails: user,
      },
      HttpStatus.OK,
    );
  }
}
