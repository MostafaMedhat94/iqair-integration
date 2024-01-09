import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { AirDataModule } from '../src/air-data/air-data.module';
import { AirDataService } from '../src/air-data/air-data.service';
import { CITIES } from '../src/common/cities.constants';
import { MongoDBModule } from '../src/database/mongodb/mongodb.module';
import { ConfigModule } from '@nestjs/config';
import { HttpExceptionFilter } from '../src/filters/http-exception.filter';
import { TEST_FIXTURES } from './test-fixtures';
import { Logger } from '../src/logger/logger.service';

const logger = new Logger();

describe('Air Data (e2e)', () => {
  let app: INestApplication;
  let airDataService = {
    getCityAirQuality: async () => TEST_FIXTURES.IQAirNearestCityResponse,
  };

  beforeAll(async () => {
    try {
      const moduleRef = await Test.createTestingModule({
        imports: [ConfigModule.forRoot(), MongoDBModule, AirDataModule],
      })
        .overrideProvider(AirDataService)
        .useValue(airDataService)
        .compile();

      app = moduleRef.createNestApplication();

      app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
      app.useGlobalFilters(new HttpExceptionFilter());

      await app.init();
    } catch (error) {
      logger.error(error);
    }
  });

  it(`should get the nearest city air quality`, async () => {
    const mockedResponse = TEST_FIXTURES.airDataResposne;

    const response = await request(app.getHttpServer())
      .get('/air-quality/nearest-city')
      .query({ latitude: CITIES.Paris.lat, longitude: CITIES.Paris.lon });

    expect(response.statusCode).toEqual(200);
    expect(response.body).toEqual(mockedResponse);
  });

  it(`should fail to get the nearest city air quality - Incorrect Query Params`, async () => {
    const errorMessage = [
      'latitude must be a latitude string or number',
      'latitude should not be empty',
    ];

    const response = await request(app.getHttpServer())
      .get('/air-quality/nearest-city')
      .query({ longitude: CITIES.Paris.lon });

    expect(response.statusCode).toEqual(400);
    expect(response.body.details.message).toEqual(errorMessage);
  });

  it(`should fail to get the nearest city air quality - Incorrect Query Params`, async () => {
    const errorMessage = [
      'longitude must be a longitude string or number',
      'longitude should not be empty',
    ];

    const response = await request(app.getHttpServer())
      .get('/air-quality/nearest-city')
      .query({ latitude: CITIES.Paris.lat });

    expect(response.statusCode).toEqual(400);
    expect(response.body.details.message).toEqual(errorMessage);
  });

  afterAll(async () => {
    await app.close();
  });
});
