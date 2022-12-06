import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { BaseResult } from './domain/dtos/base.result';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse();
    const stt = exception.getStatus();

    const msgs = exception.response?.message;
    delete exception.response;

    const result = Object.assign(new BaseResult(), {
      success: false,
      error: {
        ...exception,
        message: Array.isArray(msgs)
          ? msgs.map((m) => ({
              property: m.property,
              constraints: m.constraints,
            }))
          : msgs,
      },
    });

    res.status(stt).json(result);
  }
}
