export const TEST_FIXTURES = {
  airDataResposne: {
    Result: {
      Pollution: {
        ts: '2024-01-02T22:00:00.000Z',
        aqius: 27,
        mainus: 'o3',
        aqicn: 21,
        maincn: 'o3',
      },
    },
  },
  IQAirNearestCityResponse: {
    status: 'success',
    data: {
      city: 'Giza',
      state: 'Giza',
      country: 'Egypt',
      location: {
        type: 'Point',
        coordinates: [31.21093, 30.00808],
      },
      current: {
        pollution: {
          ts: '2024-01-08T06:00:00.000Z',
          aqius: 71,
          mainus: 'p2',
          aqicn: 31,
          maincn: 'p2',
        },
        weather: {
          ts: '2024-01-08T08:00:00.000Z',
          tp: 19,
          pr: 1020,
          hu: 27,
          ws: 1.57,
          wd: 212,
          ic: '04d',
        },
      },
    },
  },
  IQAirNearestCityError: {
    status: 'fail',
    data: {
      message: 'City not found',
    },
  },
};
