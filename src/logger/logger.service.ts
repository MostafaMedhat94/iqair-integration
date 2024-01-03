import { Injectable, LoggerService } from '@nestjs/common';
import pino from 'pino';

@Injectable()
export class Logger implements LoggerService {
  private logger: pino.Logger;

  constructor() {
    this.logger = pino({
      transport: {
        target: 'pino-pretty',
        options: {
          colorize: true,
        },
      },
    });
  }

  log(message: any, context?: string) {
    this.logger.info(message, context);
  }

  error(message: any, trace?: string, context?: string) {
    this.logger.error(message, { trace, context });
  }

  warn(message: any, context?: string) {
    this.logger.warn(message, context);
  }

  debug(message: any, context?: string) {
    this.logger.debug(message, context);
  }

  verbose(message: any, context?: string) {
    this.logger.trace(message, context);
  }
}
