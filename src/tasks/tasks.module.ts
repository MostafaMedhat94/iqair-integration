import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { ConfigService } from '@nestjs/config';
import { AirDataService } from 'src/air-data/air-data.service';
import { AirDataModule } from 'src/air-data/air-data.module';
import { MongooseModule } from '@nestjs/mongoose';
import { CityAirQuality, CityAirQualitySchema } from 'src/air-data/schemas';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: CityAirQuality.name, schema: CityAirQualitySchema },
    ]),
    AirDataModule,
  ],
  providers: [ConfigService, AirDataService, TasksService],
})
export class TasksModule {}
