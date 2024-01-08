import { Test, TestingModule } from '@nestjs/testing';
import { Logger } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CITIES } from '../common/cities.constants';
import {
  IQAirNearestCityErrorDTO,
  IQAirNearestCityResponseDTO,
} from '../air-data/dto';
import { TEST_FIXTURES } from '../../test/test-fixtures';
import { CityAirQuality } from '../air-data/schemas';
import { AirDataService } from '../air-data/air-data.service';

describe('TasksService', () => {
  let tasksService: TasksService;
  let airDataService: AirDataService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TasksService,
        {
          provide: AirDataService,
          useValue: {
            getCityAirQuality: jest.fn(),
            saveCityAirQuality: jest.fn(),
          },
        },
        Logger,
      ],
    }).compile();

    tasksService = module.get<TasksService>(TasksService);
    airDataService = module.get<AirDataService>(AirDataService);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should fetch and save city air quality data', async () => {
    const mockData =
      TEST_FIXTURES.IQAirNearestCityResponse as IQAirNearestCityResponseDTO;

    jest.spyOn(airDataService, 'getCityAirQuality').mockResolvedValue(mockData);
    jest
      .spyOn(airDataService, 'saveCityAirQuality')
      .mockResolvedValue({} as CityAirQuality);

    await tasksService.getAndSaveParisAirQuality();

    expect(airDataService.getCityAirQuality).toHaveBeenCalledWith(
      CITIES.Paris.lat,
      CITIES.Paris.lon,
    );

    expect(airDataService.saveCityAirQuality).toHaveBeenCalledWith({
      city: mockData.data.city,
      coordinates: mockData.data.location.coordinates,
      pollution: mockData.data.current.pollution,
    });
  });

  it('should log an error if fetching city air quality fails', async () => {
    const mockData =
      TEST_FIXTURES.IQAirNearestCityError as IQAirNearestCityErrorDTO;

    jest.spyOn(airDataService, 'getCityAirQuality').mockResolvedValue(mockData);

    const loggerErrorSpy = jest.spyOn(Logger.prototype, 'error');

    await tasksService.getAndSaveParisAirQuality();

    expect(loggerErrorSpy).toHaveBeenCalledWith(mockData);
    expect(airDataService.saveCityAirQuality).not.toHaveBeenCalled();
  });

  it('should log an error if an error occurs during execution', async () => {
    const mockData = new Error('Error executing task');

    jest.spyOn(airDataService, 'getCityAirQuality').mockRejectedValue(mockData);
    const loggerErrorSpy = jest.spyOn(Logger.prototype, 'error');

    await tasksService.getAndSaveParisAirQuality();

    expect(loggerErrorSpy).toHaveBeenCalledWith(mockData);
    expect(airDataService.saveCityAirQuality).not.toHaveBeenCalled();
  });
});
