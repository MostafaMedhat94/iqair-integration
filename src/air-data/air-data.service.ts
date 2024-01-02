import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CityAirQuality } from './schemas/city-air-quality.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
    CityAirQualityDTO,
  CityAirQualityResponseDTO,
  IQAirNearestCityErrorDTO,
  IQAirNearestCityResponseDTO,
  IQAirResponseStatus,
} from './dto';

@Injectable()
export class AirDataService {
  private readonly apiKey: string;
  private readonly iqAirApiUrl: string;
  private readonly nearestCityQuery: string;

  constructor(
    private readonly configService: ConfigService,
    @InjectModel(CityAirQuality.name)
    private readonly cityAirQualityModel: Model<CityAirQuality>,
  ) {
    this.iqAirApiUrl = configService.get<string>('IQ_AIR_API_URL');
    this.apiKey = configService.get<string>('API_KEY');
    this.nearestCityQuery = configService.get<string>('NEAREST_CITY_QUERY');
  }
  async getAirData(
    lat: number,
    long: number,
  ): Promise<CityAirQualityResponseDTO | IQAirNearestCityErrorDTO> {
    const data = await this.getCityAirQuality(lat, long);

    if (data.status === IQAirResponseStatus.FAIL) {
      return data;
    }

    return { Result: { Pollution: data.data.current.pollution } };
  }

  async saveCityAirQuality(
    cityAirQuality: CityAirQualityDTO,
  ): Promise<CityAirQuality> {
    const newCityAirQuality = new this.cityAirQualityModel(cityAirQuality);

    return await newCityAirQuality.save();
  }

  async getCityAirQuality(
    lat: number,
    long: number,
  ): Promise<IQAirNearestCityResponseDTO | IQAirNearestCityErrorDTO> {
    const resposne = await fetch(
      this.iqAirApiUrl +
        this.nearestCityQuery
          .replace('{{LATITUDE}}', lat.toString())
          .replace('{{LONGITUDE}}', long.toString())
          .replace('{{API_KEY}}', this.apiKey),
    );

    return resposne.json();
  }
}
