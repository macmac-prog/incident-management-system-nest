import { IsNotEmpty, IsOptional, IsString, Validate } from 'class-validator';
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
  @IsNotEmpty({ message: 'Confirm Password is required' })
  confirmPassword: string;

  @IsString()
  @IsOptional()
  rememberToken?: string;
}
