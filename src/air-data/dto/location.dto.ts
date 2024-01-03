import { IsNotEmpty, IsLatitude, IsLongitude } from 'class-validator';

export class LocationDto {
  @IsNotEmpty()
  @IsLatitude()
  latitude: number;

  @IsNotEmpty()
  @IsLongitude()
  longitude: number;
}
