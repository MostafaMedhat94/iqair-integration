import {
  BadRequestException,
  Controller,
  Get,
  Query,
  ValidationPipe,
} from '@nestjs/common';
import { AirDataService } from './air-data.service';
import { Logger } from 'src/logger/logger.service';
import {
  CityAirQualityResponseDTO,
  CityHighestPollutionResponseDTO,
  IQAirNearestCityErrorDTO,
  LocationDto,
} from './dto';

@Controller('air-data')
export class AirDataController {
  constructor(
    private readonly logger: Logger,
    private readonly airDataService: AirDataService,
  ) {}

  @Get('/nearest-city')
  async getNearestCityAirData(
    @Query(ValidationPipe) locationDto: LocationDto,
  ): Promise<CityAirQualityResponseDTO | IQAirNearestCityErrorDTO> {
    try {
      return await this.airDataService.getAirData(
        locationDto.latitude,
        locationDto.longitude,
      );
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException();
    }
  }

  @Get('/highest-pollution')
  async getHighestPollution(): Promise<CityHighestPollutionResponseDTO> {
    try {
      return await this.airDataService.getHighestPollution();
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException();
    }
  }
}
