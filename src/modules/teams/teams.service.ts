import { Injectable } from '@nestjs/common';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TeamsService {
  constructor(private readonly prisma: PrismaService) {}
  create(createTeamDto: CreateTeamDto) {
    return 'This action adds a new team';
  }

  findAll() {
    return this.prisma.team.findMany({
      include: {
        users: true,
        category: true,
      },
    });
  }

  findOne(id: number) {
    return this.prisma.team.findUnique({
      where: {
        id,
      },
      include: {
        users: true,
        category: true,
      },
    });
  }

  update(id: number, updateTeamDto: UpdateTeamDto) {
    return this.prisma.team.update({
      where: {
        id,
      },
      data: {
        ...updateTeamDto,
      },
    });
  }

  delete(id: number) {
    return this.prisma.team.delete({
      where: {
        id,
      },
    });
  }
}
