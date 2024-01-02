import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { AirDataService } from './air-data.service';
import { AirDataController } from './air-data.controller';
import { CityAirQuality, CityAirQualitySchema } from './schemas';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: CityAirQuality.name, schema: CityAirQualitySchema },
    ]),
  ],
  controllers: [AirDataController],
  providers: [AirDataService, ConfigService],
})
export class AirDataModule {}
