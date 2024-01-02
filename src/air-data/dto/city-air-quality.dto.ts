import {
  IsString,
  IsArray,
  ValidateNested,
  IsDate,
  IsNumber,
} from 'class-validator';
import { Type } from 'class-transformer';
class CityPollution {
  @IsString()
  ts: string;

  @IsNumber()
  aqius: number;

  @IsString()
  mainus: string;

  @IsNumber()
  aqicn: number;

  @IsString()
  maincn: string;
}

export class CityAirQualityDTO {
  @IsString()
  city: string;

  @IsArray()
  coordinates: [number, number];

  @ValidateNested()
  @Type(() => CityPollution)
  pollution!: CityPollution;
}

export class CityAirQualityResponseDTO {
  Result: { Pollution: CityPollution };
}
