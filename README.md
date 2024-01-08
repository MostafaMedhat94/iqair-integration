# Introduction

Welcome to the documentation for **IQ Air Integration**, a powerful and flexible API built with NestJS. This documentation provides an overview of the API, its purpose, and how to use it effectively.

## Purpose

**IQ Air Integration** is designed to _provide a flexible and powerful abstraction on top of IQ Air API_. It provides a comprehensive set of endpoints to _get the nearest city's air quality data and get the highest pollution date and time in a city's (e.g. Paris) history since the moment you get the service up and running_.

## Audience

This documentation is intended for developers, frontend engineers, and anyone who wants to interact with **IQ Air Integration**. It assumes a basic understanding of RESTful APIs, HTTP, and JavaScript/TypeScript. If you're new to NestJS or APIs in general, we recommend reviewing the [NestJS documentation](https://docs.nestjs.com/) and getting familiar with the basics before diving into this documentation.

## Technologies Used

**IQ Air Integration** is built using modern technologies and frameworks. Some of the key technologies used in the API include:

- NestJS
- TypeScript
- MongoDB
- Jest

## Prerequisites

Before you start using **IQ Air Integration**, make sure you have the following prerequisites in place:

- Docker: Install Docker on your machine by following the instructions provided in the official Docker documentation: [https://docs.docker.com/get-docker/](https://docs.docker.com/get-docker/). Docker will be used to run the API and manage the containerized environment.

- Docker Compose: Install Docker Compose on your machine by following the instructions provided in the official Docker documentation: [https://docs.docker.com/compose/install/](https://docs.docker.com/compose/install/). Docker Compose is a tool for defining and running multi-container Docker applications. It simplifies the process of running your API and any required services, such as databases or message queues, in a containerized environment.

## Running the API

To run **IQ Air Integration** using Docker and Docker Compose, follow these steps:

1. Clone the repository and navigate to the project directory.

2. Open a terminal or command prompt and run the following command to start the API and its dependencies:

```bash
$ docker-compose up --build
```

# API Endpoints

The **IQ Air Integration** provides the following endpoints to interact with the API:

## `GET /air-quality/nearest-city?latitude=48.8566&longitude=2.349014`

**Description**: Retrieves the nearest city's air quality data.

**Query Parameters**:

- `latitude` (required): The city's latitude.
- `longitude` (required): The city's longitude.

**Response**:

```json
{
  "Result": {
    "Pollution": {
      "ts": "2024-01-06T09:00:00.000Z",
      "aqius": 31,
      "mainus": "p2",
      "aqicn": 15,
      "maincn": "n2"
    }
  }
}
```

## `GET /air-quality/highest-pollution`

**Description**: Retrieves Paris' highest pollution date and time.

**Response**:

```json
{
  "Result": {
    "pollution": {
      "ts": "2024-01-01T14:00:00.000Z",
      "aqius": 39,
      "mainus": "p2",
      "aqicn": 18,
      "maincn": "p1"
    },
    "date": "2024-01-01",
    "time": "15:02:50"
  }
}
```

# Error Handling

The **IQ Air Integration** handles errors using the following error codes and error responses:

## Error Codes

| Error Code | Description           |
| ---------- | --------------------- |
| 400        | Bad Request           |
| 404        | Not Found             |
| 500        | Internal Server Error |

## Error Responses

### 400 Bad Request

**Response**:

```json
{
  "details": {
    "message": [
      "longitude must be a longitude string or number",
      "longitude should not be empty"
    ],
    "error": "Bad Request",
    "statusCode": 400
  },
  "statusCode": 400,
  "timestamp": "2024-01-08T13:53:43.256Z",
  "path": "/air-quality/nearest-city?latitude=48.8566"
}
```

```json
{
  "details": {
    "message": "Too Many Requests",
    "error": "Bad Request",
    "statusCode": 400
  },
  "statusCode": 400,
  "timestamp": "2024-01-08T15:02:16.688Z",
  "path": "/air-quality/nearest-city?latitude=48.8566&longitude=2.349014"
}
```

### 404 Not Found

**Response**:

```json
{
  "details": {
    "message": "Cannot GET /air-quality/highest-pollutions",
    "error": "Not Found",
    "statusCode": 404
  },
  "statusCode": 404,
  "timestamp": "2024-01-08T13:34:38.480Z",
  "path": "/air-quality/highest-pollutions"
}
```

### 500 Internal Server Error

**Response**:

```json
{
  "details": {
    "message": "Internal Server Error",
    "statusCode": 500
  },
  "statusCode": 500,
  "timestamp": "2024-01-08T15:07:00.366Z",
  "path": "/air-quality/nearest-city?latitude=48.8566&longitude=2.349014"
}
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
