import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { AirDataService } from '../air-data/air-data.service';
import { IQAirResponseStatus } from '../air-data/dto';
import { CITIES } from '../common/cities.constants';

@Injectable()
export class TasksService {
  private readonly logger = new Logger(TasksService.name);

  constructor(private readonly airDataService: AirDataService) {}

  @Cron(CronExpression.EVERY_MINUTE)
  async getAndSaveParisAirQuality() {
    try {
      const data = await this.airDataService.getCityAirQuality(
        CITIES.Paris.lat,
        CITIES.Paris.lon,
      );

      if (data.status === IQAirResponseStatus.FAIL) {
        this.logger.error(data);

        return;
      }

      const cityAirQuality = {
        city: data.data.city,
        coordinates: data.data.location.coordinates,
        pollution: data.data.current.pollution,
      };

      await this.airDataService.saveCityAirQuality(cityAirQuality);
    } catch (error) {
      this.logger.error(error);
    }
  }
}
