import { INestApplication } from '@nestjs/common';

import { createTestingModule } from './create-testing-module';

let app: INestApplication;
let server: any;

export async function getApplication() {
  if (!app) {
    app = await createTestingModule();
  }

  if (!server) {
    server = app.getHttpServer();
  }

  return { app, server };
}
