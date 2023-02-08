import {
  Controller,
  Get,
  Param,
  Query,
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
import { BasePagging, Pagging } from 'src/domain/dtos/pagging';
import { Chat } from 'src/domain/schemas';
import { HttpExceptionFilter } from 'src/filters';
import { JwtAuthGuard } from '../user/jwt.auth.guard';
import { ChatService } from './chat.service';

@ApiTags('ChatEndpoint')
@UseFilters(HttpExceptionFilter)
@ApiExtraModels(BaseResult, Pagging, Chat)
@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({
    schema: {
      $ref: getSchemaPath(BaseResult<Pagging<Chat>>),
    },
  })
  @Get()
  async getChats(@Res() res, @Req() req, @Query() query: BasePagging) {
    const user = req.user;
    const result = await this.chatService.listChats(
      user.userId,
      query.limit,
      query.page,
    );
    return res.json(result);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({
    schema: {
      $ref: getSchemaPath(BaseResult<Pagging<Chat>>),
    },
  })
  @Get(':to')
  async getMessages(
    @Res() res,
    @Req() req,
    @Param('to') id: string,
    @Query() query: BasePagging,
  ) {
    const user = req.user;
    const result = await this.chatService.getMessages(
      user.userId,
      id,
      query.limit,
      query.page,
    );
    return res.json(result);
  }
}
