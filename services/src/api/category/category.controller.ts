import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Query,
  Res,
  UseFilters,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiExtraModels,
  ApiOkResponse,
  ApiQuery,
  ApiTags,
  getSchemaPath,
} from '@nestjs/swagger';
import { BaseResult } from 'src/domain/dtos/base.result';
import { Category } from 'src/domain/schemas/category.schema';
import { HttpExceptionFilter } from 'src/filters';
import { AdminGuard } from '../user/admin.auth.guard';
import { JwtAuthGuard } from '../user/jwt.auth.guard';
import { CategoryService } from './category.service';
import {
  AddCategoriesDto,
  DeleteCategoriesDto,
  UpdateCategoryDto,
} from './dtos';

@ApiTags('CategoryEndpoint')
@UseFilters(HttpExceptionFilter)
@ApiExtraModels(BaseResult, Category)
@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @ApiQuery({
    name: 'search',
    type: 'string',
    required: false,
  })
  @ApiOkResponse({
    schema: {
      $ref: getSchemaPath(BaseResult),
      properties: {
        data: {
          type: 'array',
          items: {
            $ref: getSchemaPath(Category),
          },
        },
      },
    },
  })
  @Get()
  async getCategories(@Res() res, @Query('search') search?: string) {
    const result = await this.categoryService.getCategories(search);
    return res.json(result);
  }

  @UseGuards(JwtAuthGuard, AdminGuard)
  @ApiBearerAuth()
  @ApiOkResponse({
    schema: {
      $ref: getSchemaPath(BaseResult),
      properties: {
        data: {
          type: 'array',
          items: {
            $ref: getSchemaPath(Category),
          },
        },
      },
    },
  })
  @Post()
  async addCategories(@Res() res, @Body() body: AddCategoriesDto) {
    const result = await this.categoryService.addCategories(body);
    return res.json(result);
  }

  @UseGuards(JwtAuthGuard, AdminGuard)
  @ApiBearerAuth()
  @ApiOkResponse({
    schema: {
      $ref: getSchemaPath(BaseResult),
      properties: {
        data: {
          $ref: getSchemaPath(Category),
        },
      },
    },
  })
  @Put()
  async updateCategory(@Res() res, @Body() body: UpdateCategoryDto) {
    const result = await this.categoryService.updateCategory(body);
    return res.json(result);
  }

  @UseGuards(JwtAuthGuard, AdminGuard)
  @ApiBearerAuth()
  @ApiOkResponse({
    schema: {
      $ref: getSchemaPath(BaseResult),
      properties: {
        data: {
          type: 'array',
          items: {
            $ref: getSchemaPath(Category),
          },
        },
      },
    },
  })
  @Delete()
  async deleteCategories(@Res() res, @Body() body: DeleteCategoriesDto) {
    const result = await this.categoryService.deleteCategories(body);
    return res.json(result);
  }
}
