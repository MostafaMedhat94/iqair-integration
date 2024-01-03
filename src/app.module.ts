import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { APP_FILTER } from '@nestjs/core';

import { TasksModule } from './tasks/tasks.module';
import { AirDataModule } from './air-data/air-data.module';
import { MongoDBModule } from './database/mongodb/mongodb.module';
import { Logger } from './logger/logger.service';
import { HttpExceptionFilter } from './filters/http-exception.filter';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongoDBModule,
    ScheduleModule.forRoot(),
    AirDataModule,
    TasksModule,
  ],
  providers: [
    Logger,
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule {}
