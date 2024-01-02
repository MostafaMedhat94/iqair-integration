export class IQAirNearestCityResponseDTO {
  status: IQAirResponseStatus.SUCCESS;
  data: {
    city: string;
    state: string;
    country: string;
    location: {
      type: string;
      coordinates: [number, number];
    };
    current: {
      pollution: {
        ts: string;
        aqius: number;
        mainus: string;
        aqicn: number;
        maincn: string;
      };
      weather: {
        ts: string;
        tp: number;
        pr: number;
        hu: number;
        ws: number;
        wd: number;
        ic: string;
      };
    };
  };
}

export class IQAirNearestCityErrorDTO {
  status: IQAirResponseStatus.FAIL;
  data: {
    message: string;
  };
}

export enum IQAirResponseStatus {
  SUCCESS = 'success',
  FAIL = 'fail',
}
