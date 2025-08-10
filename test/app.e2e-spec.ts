import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { App } from 'supertest/types';
import {
  PostgreSqlContainer,
  StartedPostgreSqlContainer,
} from '@testcontainers/postgresql';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let locationId = '';
  let app: INestApplication<App>;
  let postgresContainer: StartedPostgreSqlContainer;

  beforeAll(async () => {
    postgresContainer = await new PostgreSqlContainer(
      'postgres:17-alpine',
    ).start();

    process.env.DATABASE_HOST = postgresContainer.getHost();
    process.env.DATABASE_PORT = postgresContainer.getPort().toString();
    process.env.DATABASE_USERNAME = postgresContainer.getUsername();
    process.env.DATABASE_PASSWORD = postgresContainer.getPassword();
    process.env.DATABASE_NAME = postgresContainer.getDatabase();
  }, 15000);

  afterAll(async () => {
    await postgresContainer.stop();
  }, 15000);

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        transform: true, // Optional: enable auto-transformation of payloads to DTO instances
      }),
    );

    await app.init();
  });

  describe('Locations', () => {
    it('/api/v1/locations (POST)', async () => {
      const response = await request(app.getHttpServer())
        .post('/api/v1/locations')
        .send({
          name: 'sample',
          description: 'sample description',
          icon: 'sampleIcon',
          latitude: 40.785091,
          longitude: -73.968285,
        });

      expect(response.status).toBe(HttpStatus.CREATED);

      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
      locationId = response.body.data.id;

      expect(response.body).toEqual({
        data: {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          id: expect.any(String),
          name: 'sample',
          icon: 'sampleIcon',
          description: 'sample description',
          latitude: 40.785091,
          longitude: -73.968285,
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          createdAt: expect.any(String),
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          updatedAt: expect.any(String),
        },
      });
    });

    it('/api/v1/locations (POST) Validation Error', async () => {
      const response = await request(app.getHttpServer())
        .post('/api/v1/locations')
        .send({});

      expect(response.status).toBe(HttpStatus.BAD_REQUEST);

      expect(response.body).toEqual({
        error: 'Bad Request',
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        message: expect.anything(),
        statusCode: 400,
      });
    });

    it('/api/v1/locations (GET)', async () => {
      const response = await request(app.getHttpServer())
        .get('/api/v1/locations')
        .expect(200);

      expect(response.body).toEqual({
        data: [
          {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            id: expect.any(String),
            name: 'sample',
            icon: 'sampleIcon',
            description: 'sample description',
            latitude: '40.785091',
            longitude: '-73.968285',
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            createdAt: expect.any(String),
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            updatedAt: expect.any(String),
          },
        ],
      });
    });

    it('/api/v1/locations/:id (PUT)', async () => {
      const response = await request(app.getHttpServer())
        .put(`/api/v1/locations/${locationId}`)
        .send({
          name: 'name changed',
        });

      expect(response.status).toBe(HttpStatus.OK);
    });

    it('/api/v1/locations/:id (GET)', async () => {
      const response = await request(app.getHttpServer()).get(
        `/api/v1/locations/${locationId}`,
      );

      expect(response.status).toBe(HttpStatus.OK);

      expect(response.body).toEqual({
        data: {
          id: locationId,
          name: 'name changed',
          icon: 'sampleIcon',
          description: 'sample description',
          latitude: '40.785091',
          longitude: '-73.968285',
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          createdAt: expect.any(String),
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          updatedAt: expect.any(String),
        },
      });
    });

    it('/api/v1/locations/:id (DELETE)', async () => {
      const response = await request(app.getHttpServer()).delete(
        `/api/v1/locations/${locationId}`,
      );

      expect(response.status).toBe(HttpStatus.NO_CONTENT);
    });
  });
});
