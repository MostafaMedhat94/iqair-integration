import { Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { isString } from 'class-validator';
import { Response, Request } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    const details = exception.getResponse();

    response.status(status).json({
      details,
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
