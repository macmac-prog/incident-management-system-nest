import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/modules/prisma/prisma.service';
import { LoginDto } from './dto/login.dto';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly usersService: UsersService,
  ) {}

  validateUser(loginDto: LoginDto): Promise<any> {
    const user =
      this.usersService.findByEmail(loginDto.usernameOrEmail) ||
      this.usersService.findByUsername(loginDto.usernameOrEmail);

    if (!user || !user.password) {
      return null;
    }
  }
}
