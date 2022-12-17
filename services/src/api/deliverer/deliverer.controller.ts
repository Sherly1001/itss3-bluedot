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
import { Deliverer } from 'src/domain/schemas';
import { HttpExceptionFilter } from 'src/filters';
import { AdminGuard } from '../user/admin.auth.guard';
import { JwtAuthGuard } from '../user/jwt.auth.guard';
import { DelivererService } from './deliverer.service';
import { UpdateDeliveryDto } from './dtos';

@ApiTags('DelivererEndpoint')
@UseFilters(HttpExceptionFilter)
@ApiExtraModels(BaseResult, Deliverer)
@Controller('deliverer')
export class DelivererController {
  constructor(private readonly delivererService: DelivererService) {}

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
            $ref: getSchemaPath(Deliverer),
          },
        },
      },
    },
  })
  @Get()
  async getItems(@Res() res, @Query('search') search: string) {
    const result = await this.delivererService.getAll(search);
    return res.json(result);
  }

  @UseGuards(JwtAuthGuard, AdminGuard)
  @ApiBearerAuth()
  @ApiOkResponse({
    schema: {
      $ref: getSchemaPath(BaseResult),
      properties: {
        data: {
          $ref: getSchemaPath(Deliverer),
        },
      },
    },
  })
  @Post()
  async create(@Res() res, @Body() body: Deliverer) {
    const result = await this.delivererService.create(body);
    return res.json(result);
  }

  @UseGuards(JwtAuthGuard, AdminGuard)
  @ApiBearerAuth()
  @ApiOkResponse({
    schema: {
      $ref: getSchemaPath(BaseResult),
      properties: {
        data: {
          $ref: getSchemaPath(Deliverer),
        },
      },
    },
  })
  @Put(':id')
  async update(
    @Res() res,
    @Param('id') id: string,
    @Body() body: UpdateDeliveryDto,
  ) {
    const result = await this.delivererService.update(id, body);
    return res.json(result);
  }

  @UseGuards(JwtAuthGuard, AdminGuard)
  @ApiBearerAuth()
  @ApiOkResponse({
    schema: {
      $ref: getSchemaPath(BaseResult),
      properties: {
        data: {
          $ref: getSchemaPath(Deliverer),
        },
      },
    },
  })
  @Delete(':id')
  async delte(@Res() res, @Param('id') id: string) {
    const result = await this.delivererService.delete(id);
    return res.json(result);
  }
}
