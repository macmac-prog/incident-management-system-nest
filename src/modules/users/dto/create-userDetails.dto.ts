import { IsEmail, IsNotEmpty, IsOptional, IsString, Validate } from "class-validator";
import { IsUnique } from "../../../common/pipes/is-unique.validator";

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
    @IsNotEmpty({ message: 'Email is required' })
    @Validate(IsUnique, ['UserDetail', 'email'], { message: 'Email is already exists.' })
    email: string;
}
