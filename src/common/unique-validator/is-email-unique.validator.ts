import { Injectable } from '@nestjs/common';
import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { PrismaService } from 'src/modules/prisma/prisma.service';

@ValidatorConstraint({ name: 'IsUniqueConstraint', async: true })
@Injectable()
export class IsUnique implements ValidatorConstraintInterface {
  constructor(private readonly prisma: PrismaService) {}

  async validate(value: any, args?: ValidationArguments): Promise<boolean> {
    const [model, field] = args?.constraints as string[];

    // Dynamically query the specified model and field
    const exists = await this.prisma[model].findFirst({
      where: { [field]: value },
    });

    return !exists;
  }

  defaultMessage(args: ValidationArguments): string {
    const field = args?.property;
    return `${field} already exists.`;
  }
}
