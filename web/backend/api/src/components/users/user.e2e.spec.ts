import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';

import { getApplication } from '@test/utils';

describe('user (e2e)', () => {
  let app: INestApplication;
  let server: any;
  beforeEach(async () => {
    const apps = await getApplication();
    app = apps.app;
    server = apps.server;
  });

  afterEach(async () => {
    server.close();
    await app.close();
  });

  it('Query', async () => {
    const { body } = await request(server)
      .post('/graphql')
      .send({
        query: `query Query {
        users {
          id
        }
      }`,
      });
    expect(body.data.users.length).toBe(2);
  });
});
