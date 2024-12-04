import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpException,
  HttpStatus,
  Req,
  Res,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post('create-category')
  create(@Body() createCategoryDto: CreateCategoryDto, @Req() req) {
    return this.categoryService.create(createCategoryDto, req.id);
  }

  @Get()
  async findAll() {
    const categories = await this.categoryService.findAll();
    if (categories.length === 0) {
      throw new HttpException(
        {
          message: 'No categories found',
        },
        HttpStatus.NOT_FOUND,
      );
    }

    throw new HttpException(
      {
        message: 'Categories fetched successfully',
        categories,
      },
      HttpStatus.OK,
    );
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    const category = this.categoryService.findOne(id);

    if (!category) {
      throw new HttpException(
        {
          message: 'No category found in this id',
        },
        HttpStatus.NOT_FOUND,
      );
    }

    throw new HttpException(
      {
        message: 'Category fetched successfully',
        category,
      },
      HttpStatus.OK,
    );
  }

  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() updateCategoryDto: UpdateCategoryDto,
    @Res() res
  ) {
    return this.categoryService.update(id, updateCategoryDto, res.teamId);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.categoryService.delete(id);
  }
}
