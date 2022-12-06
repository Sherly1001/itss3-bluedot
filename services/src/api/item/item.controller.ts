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
  ApiTags,
  getSchemaPath,
} from '@nestjs/swagger';
import { BaseResult } from 'src/domain/dtos/base.result';
import { Item } from 'src/domain/schemas';
import { HttpExceptionFilter } from 'src/filters';
import { AdminGuard } from '../user/admin.auth.guard';
import { JwtAuthGuard } from '../user/jwt.auth.guard';
import { GetItemsDto, UpdateItemDto } from './dtos';
import { ItemService } from './item.service';

@ApiTags('ItemEndpoint')
@UseFilters(HttpExceptionFilter)
@ApiExtraModels(BaseResult, Item)
@Controller('item')
export class ItemController {
  constructor(private readonly itemService: ItemService) {}

  @ApiOkResponse({
    schema: {
      $ref: getSchemaPath(BaseResult),
      properties: {
        data: {
          type: 'array',
          items: {
            $ref: getSchemaPath(Item),
          },
        },
      },
    },
  })
  @Get()
  async getItems(@Res() res, @Query() query: GetItemsDto) {
    const result = await this.itemService.getItems(query);
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
            $ref: getSchemaPath(Item),
          },
        },
      },
    },
  })
  @Post()
  async addItem(@Res() res, @Body() body: Item) {
    const result = await this.itemService.addItem(body);
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
            $ref: getSchemaPath(Item),
          },
        },
      },
    },
  })
  @Put(':id')
  async updateItem(
    @Res() res,
    @Body() body: UpdateItemDto,
    @Param('id') id: string,
  ) {
    const result = await this.itemService.updateItem(id, body);
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
            $ref: getSchemaPath(Item),
          },
        },
      },
    },
  })
  @Delete(':id')
  async deleteItem(@Res() res, @Param('id') id: string) {
    const result = await this.itemService.deleteItem(id);
    return res.json(result);
  }
}
