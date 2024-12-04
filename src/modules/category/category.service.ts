import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CategoryService {
  constructor(private readonly prisma: PrismaService) {}
  create(createCategoryDto: CreateCategoryDto, teamId: number) {
    return this.prisma.category.create({
      data: {
        ...createCategoryDto,
        teamId: teamId,
      },
    });
  }

  findAll() {
    return this.prisma.category.findMany({
      include: {
        team: true,
        report: true,
      },
    });
  }

  findOne(id: number) {
    return this.prisma.category.findUnique({
      where: {
        id,
      },
      include: {
        team: true,
      },
    });
  }

  update(id: number, updateCategoryDto: UpdateCategoryDto, teamId: number) {
    return this.prisma.category.update({
      where: {
        id,
      },
      data: {
        ...updateCategoryDto,
        teamId: teamId,
      },
    });
  }

  delete(id: number) {
    return this.prisma.category.delete({
      where: {
        id,
      },
    });
  }
}
