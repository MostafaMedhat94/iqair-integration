import { CityPollution } from './city-air-quality.dto';

export class CityHighestPollutionDTO {
  city: string;
  coordinates: number[];
  pollution: CityPollution;
  createdAt: string;
}

export class CityHighestPollutionResponseDTO {
  Result: { pollution: CityPollution; date: string; time: string };
}
