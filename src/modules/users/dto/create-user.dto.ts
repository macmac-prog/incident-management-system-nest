import { IsNotEmpty, IsOptional, IsString, Validate } from "class-validator";
import { IsUnique } from "src/common/unique-validator/is-email-unique.validator";

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @Validate(IsUnique, ['UserLogin', 'username'], {
    message: 'Username already taken.',
  })
  username: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsOptional()
  rememberToken?: string;
}
