import { IsEmail, IsNotEmpty, IsOptional, IsString, Validate } from 'class-validator';
import { IsPasswordMatch } from '../../../common/pipes/confirm-password.validator';
import { IsUnique } from '../../../common/pipes/is-unique.validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @Validate(IsUnique, ['UserLogin', 'username'], {
    message: 'Username is already taken.',
  })
  username: string;

  @IsString()
  @IsNotEmpty({ message: 'Password is required' })
  password: string;

  @IsPasswordMatch('password', { message: 'Passwords do not match' })
  @IsString()
  confirmPassword?: string;

  @IsString()
  @IsOptional()
  rememberToken?: string;

  @IsString()
  firstName: string;

  @IsString()
  @IsOptional()
  middleName?: string;

  @IsString()
  lastName: string;

  @IsString()
  @IsOptional()
  phoneNumber?: string;

  @IsString()
  @IsOptional()
  address?: string;

  @IsEmail()
  @IsNotEmpty({ message: 'Email is required' })
  @Validate(IsUnique, ['UserDetail', 'email'], { message: 'Email is already exists.' })
  email: string;
}
