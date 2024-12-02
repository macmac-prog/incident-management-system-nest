import { IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  @IsString()
  @IsNotEmpty({ message: 'Username or Email is required' })
  usernameOrEmail: string;

  @IsNotEmpty({ message: 'Password is required' })
  password: string;

  rememberToken?: string;
}
