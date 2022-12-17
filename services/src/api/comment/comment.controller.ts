import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
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
import { Comment } from 'src/domain/schemas';
import { HttpExceptionFilter } from 'src/filters';
import { JwtAuthGuard } from '../user/jwt.auth.guard';
import { CommentService } from './comment.service';
import { UpdateComment } from './dtos';

@ApiTags('CommentEndpoint')
@UseFilters(HttpExceptionFilter)
@ApiExtraModels(BaseResult, Comment)
@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @ApiOkResponse({
    schema: {
      $ref: getSchemaPath(BaseResult),
      properties: {
        data: {
          type: 'array',
          items: {
            $ref: getSchemaPath(Comment),
          },
        },
      },
    },
  })
  @Get(':item/:target')
  async getItems(
    @Res() res,
    @Param('item') item: string,
    @Param('target') target: string,
  ) {
    const result = await this.commentService.getAll(item, target);
    return res.json(result);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({
    schema: {
      $ref: getSchemaPath(BaseResult),
      properties: {
        data: {
          $ref: getSchemaPath(Comment),
        },
      },
    },
  })
  @Post()
  async create(@Res() res, @Req() req, @Body() body: Comment) {
    const result = await this.commentService.create(req.user.userId, body);
    return res.json(result);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({
    schema: {
      $ref: getSchemaPath(BaseResult),
      properties: {
        data: {
          $ref: getSchemaPath(Comment),
        },
      },
    },
  })
  @Put(':id')
  async update(
    @Res() res,
    @Req() req,
    @Param('id') id: string,
    @Body() body: UpdateComment,
  ) {
    const result = await this.commentService.update(req.user.userId, id, body);
    return res.json(result);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({
    schema: {
      $ref: getSchemaPath(BaseResult),
      properties: {
        data: {
          $ref: getSchemaPath(Comment),
        },
      },
    },
  })
  @Delete(':id')
  async delete(@Res() res, @Req() req, @Param('id') id: string) {
    const result = await this.commentService.delete(req.user.userId, id);
    return res.json(result);
  }
}
