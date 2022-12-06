import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
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
import { Shop } from 'src/domain/schemas';
import { HttpExceptionFilter } from 'src/filters';
import { AdminGuard } from '../user/admin.auth.guard';
import { JwtAuthGuard } from '../user/jwt.auth.guard';
import { UpdateShopDto } from './dtos';
import { ShopService } from './shop.service';

@ApiTags('ShopEndpoint')
@UseFilters(HttpExceptionFilter)
@ApiExtraModels(BaseResult, Shop)
@Controller('shop')
export class ShopController {
  constructor(private readonly shopService: ShopService) {}

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
            $ref: getSchemaPath(Shop),
          },
        },
      },
    },
  })
  @Get()
  async getShops(@Res() res, @Query('search') search?: string) {
    const result = await this.shopService.getShops(search);
    return res.json(result);
  }

  @UseGuards(JwtAuthGuard, AdminGuard)
  @ApiBearerAuth()
  @ApiOkResponse({
    schema: {
      $ref: getSchemaPath(BaseResult),
      properties: {
        data: {
          $ref: getSchemaPath(Shop),
        },
      },
    },
  })
  @Post()
  async addShop(@Res() res, @Body() body: Shop) {
    const result = await this.shopService.addShop(body);
    return res.json(result);
  }

  @UseGuards(JwtAuthGuard, AdminGuard)
  @ApiBearerAuth()
  @ApiOkResponse({
    schema: {
      $ref: getSchemaPath(BaseResult),
      properties: {
        data: {
          $ref: getSchemaPath(Shop),
        },
      },
    },
  })
  @Put(':id')
  async updateShop(
    @Res() res,
    @Body() body: UpdateShopDto,
    @Param('id') id: string,
  ) {
    const result = await this.shopService.updateShop(id, body);
    return res.json(result);
  }

  @UseGuards(JwtAuthGuard, AdminGuard)
  @ApiBearerAuth()
  @ApiOkResponse({
    schema: {
      $ref: getSchemaPath(BaseResult),
      properties: {
        data: {
          $ref: getSchemaPath(Shop),
        },
      },
    },
  })
  @Delete(':id')
  async deleteShop(@Res() res, @Param('id') id: string) {
    const result = await this.shopService.deleteShop(id);
    return res.json(result);
  }
}
