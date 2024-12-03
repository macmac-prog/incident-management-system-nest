import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCategoryDto {
  @IsString()
  @IsNotEmpty({ message: 'Select team first' })
  teamId: number;

  @IsString()
  @IsNotEmpty({ message: 'Category name is required' })
  name: string;
}
