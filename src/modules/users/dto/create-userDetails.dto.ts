import { IsEmail, IsNotEmpty, IsOptional, IsString, Validate } from "class-validator";
import { IsUnique } from "src/common/unique-validator/is-email-unique.validator";

export class CreateUserDetailsDto {
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
    @IsNotEmpty()
    @Validate(IsUnique, ['UserDetail', 'email'], { message: 'Email already exists.' })
    email: string;
}
