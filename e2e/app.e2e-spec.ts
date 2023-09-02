import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { Chance } from 'chance';
import { AppModule } from '@/app.module';

const chance = new Chance();

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });

  it('/hello/:name (GET)', () => {
    const name = chance.name();
    return request(app.getHttpServer())
      .get(`/hello/${name}`)
      .expect(200)
      .expect(`Hello ${name}!`);
  });
});