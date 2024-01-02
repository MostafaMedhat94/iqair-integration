import { Controller, Get, Param, Query } from '@nestjs/common';
import { AirDataService } from './air-data.service';

@Controller('air-data')
export class AirDataController {
  constructor(private readonly airDataService: AirDataService) {}

  @Get('/nearest-city')
  async getAirData(
    @Query('latitude') latitude: number,
    @Query('longitude') longitude: number,
  ): Promise<any> {
    return await this.airDataService.getAirData(latitude, longitude);
  }
}
