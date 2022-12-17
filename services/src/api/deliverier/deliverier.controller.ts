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
import { Deliverier } from 'src/domain/schemas';
import { HttpExceptionFilter } from 'src/filters';
import { AdminGuard } from '../user/admin.auth.guard';
import { JwtAuthGuard } from '../user/jwt.auth.guard';
import { DeliverierService } from './deliverier.service';
import { UpdateDeliveryDto } from './dtos';

@ApiTags('DeliverierEndpoint')
@UseFilters(HttpExceptionFilter)
@ApiExtraModels(BaseResult, Deliverier)
@Controller('deliverier')
export class DeliverierController {
  constructor(private readonly deliverierService: DeliverierService) {}

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
            $ref: getSchemaPath(Deliverier),
          },
        },
      },
    },
  })
  @Get()
  async getItems(@Res() res, @Query('search') search: string) {
    const result = await this.deliverierService.getAll(search);
    return res.json(result);
  }

  @UseGuards(JwtAuthGuard, AdminGuard)
  @ApiBearerAuth()
  @ApiOkResponse({
    schema: {
      $ref: getSchemaPath(BaseResult),
      properties: {
        data: {
          $ref: getSchemaPath(Deliverier),
        },
      },
    },
  })
  @Post()
  async create(@Res() res, @Body() body: Deliverier) {
    const result = await this.deliverierService.create(body);
    return res.json(result);
  }

  @UseGuards(JwtAuthGuard, AdminGuard)
  @ApiBearerAuth()
  @ApiOkResponse({
    schema: {
      $ref: getSchemaPath(BaseResult),
      properties: {
        data: {
          $ref: getSchemaPath(Deliverier),
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
    const result = await this.deliverierService.update(id, body);
    return res.json(result);
  }

  @UseGuards(JwtAuthGuard, AdminGuard)
  @ApiBearerAuth()
  @ApiOkResponse({
    schema: {
      $ref: getSchemaPath(BaseResult),
      properties: {
        data: {
          $ref: getSchemaPath(Deliverier),
        },
      },
    },
  })
  @Delete(':id')
  async delte(@Res() res, @Param('id') id: string) {
    const result = await this.deliverierService.delete(id);
    return res.json(result);
  }
}
