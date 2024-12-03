import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../modules/prisma/prisma.service';
import { LoginDto } from './dto/login.dto';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(loginDto: LoginDto): Promise<any> {
    const user =
      (await this.usersService.findByEmail(loginDto.usernameOrEmail)) ||
      (await this.usersService.findByUsername(loginDto.usernameOrEmail));

    if (!user || !user.password) {
      return null;
    }

    const isPasswordValid = await bcrypt.compare(
      loginDto.password,
      user.password,
    );

    if (isPasswordValid) {
      const { password, ...result } = user;

      return result;
    }

    return null;
  }

  private generateRememberToken() {
    return require('crypto').randomBytes(32).toString('hex');
  }

  async login(user: any, rememberToken: string) {
    const userDetails = await this.usersService.findById(user.id);

    const payload = {
      username: user.username,
      sub: user.id,
      roles: userDetails.roles,
    };

    if (!user.rememberToken || rememberToken === null) {
      rememberToken = this.generateRememberToken();
      user.rememberToken = rememberToken;

      await this.prisma.userLogin.update({
        where: { id: user.id },
        data: { rememberToken },
      });
    }

    const accessToken = this.jwtService.sign({ ...payload, rememberToken });

    return { accessToken, rememberToken };
  }
}
