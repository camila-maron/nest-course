// Import NestJS testing utilities and dependencies for e2e tests
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from './../src/app.module';

// End-to-end test suite for the authentication system
describe('Authentication System (e2e)', () => {
  let app: INestApplication<App>;

  // Runs before each test, sets up the NestJS application
  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  // Test the signup route
  it('/handles a signup request', () => {
    const email = 'test@test.com';
    return request(app.getHttpServer())
      .post('/auth/signup')
      .send({ email, password: 'Pass1234!' })
      .expect(201)
      .then((response) => {
        const { id, email } = response.body;
        expect(id).toBeDefined();
        expect(email).toEqual(email);
      });
  });

  // Test signing up and retrieving the currently logged in user
  it('sign up as a new user then get the currently logged in user', async () => {
    const email = 'test@test.com';

    const response = await request(app.getHttpServer())
      .post('/auth/signup')
      .send({ email, password: 'Pass1234!' })
      .expect(201);

    const cookie = response.get('Set-Cookie') as string[];

    const { body } = await request(app.getHttpServer())
      .get('/auth/whoami')
      .set('Cookie', cookie)
      .expect(200);

    expect(body.email).toEqual(email);
  });
});
