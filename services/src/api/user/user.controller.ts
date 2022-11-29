import {
  Body,
  Controller,
  Delete,
  Get,
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
import { User } from 'src/domain/schemas';
import { HttpExceptionFilter } from 'src/filters';
import { LoginUserDto, UpdateUserDto, UserDto } from './dtos';
import { JwtAuthGuard } from './jwt.auth.guard';
import { UserService } from './user.service';

@ApiTags('UserEndpoint')
@UseFilters(HttpExceptionFilter)
@ApiExtraModels(BaseResult, User)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({
    schema: {
      $ref: getSchemaPath(BaseResult),
      properties: {
        data: { $ref: getSchemaPath(User) },
      },
    },
  })
  @Get()
  async getUser(@Res() res, @Req() req) {
    const result = await this.userService.getUser(req.user.userId);
    return res.json(result);
  }

  @Post()
  @ApiOkResponse({
    schema: {
      $ref: getSchemaPath(BaseResult),
      properties: {
        data: { $ref: getSchemaPath(User) },
      },
    },
  })
  async createUser(@Res() res, @Body() body: UserDto) {
    const result = await this.userService.createUser(body);
    return res.json(result);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Put()
  @ApiOkResponse({
    schema: {
      $ref: getSchemaPath(BaseResult),
      properties: {
        data: { $ref: getSchemaPath(User) },
      },
    },
  })
  async updateUser(@Res() res, @Req() req, @Body() body: UpdateUserDto) {
    const result = await this.userService.updateUser(req.user.userId, body);
    return res.json(result);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Delete()
  @ApiOkResponse({
    schema: {
      $ref: getSchemaPath(BaseResult),
      properties: {
        data: { $ref: getSchemaPath(User) },
      },
    },
  })
  async deleteUser(@Res() res, @Req() req) {
    const result = await this.userService.deleteUser(req.user.userId);
    return res.json(result);
  }

  @Post('login')
  @ApiOkResponse({
    schema: {
      $ref: getSchemaPath(BaseResult),
      properties: {
        data: {
          type: 'object',
          properties: {
            access_token: { type: 'string' },
          },
        },
      },
    },
  })
  async login(@Res() res, @Body() body: LoginUserDto) {
    const result = await this.userService.loginUser(body);
    return res.json(result);
  }
}
