import {
  BadRequestException,
  Controller,
  Get,
  Query,
  ValidationPipe,
} from '@nestjs/common';
import { AirDataService } from './air-data.service';
import { Logger } from '../logger/logger.service';
import {
  CityAirQualityResponseDTO,
  CityHighestPollutionResponseDTO,
  IQAirNearestCityErrorDTO,
  IQAirResponseStatus,
  LocationDto,
} from './dto';

@Controller('air-quality')
export class AirDataController {
  constructor(
    private readonly logger: Logger,
    private readonly airDataService: AirDataService,
  ) {}

  @Get('/nearest-city')
  async getNearestCityAirData(
    @Query(ValidationPipe) location: LocationDto,
  ): Promise<CityAirQualityResponseDTO | IQAirNearestCityErrorDTO> {
    try {
      const { latitude, longitude } = location;

      const data = await this.airDataService.getCityAirQuality(
        latitude,
        longitude,
      );

      if (data.status === IQAirResponseStatus.FAIL) {
        throw new BadRequestException(data.data.message);
      }

      return { Result: { Pollution: data.data.current.pollution } };
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  @Get('/highest-pollution')
  async getHighestPollution(): Promise<CityHighestPollutionResponseDTO> {
    try {
      return await this.airDataService.getHighestPollution();
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }
}
