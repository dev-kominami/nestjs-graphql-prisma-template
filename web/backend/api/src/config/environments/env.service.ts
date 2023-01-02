import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core';
import * as path from 'path';

const SCHEMA_FILE_PATH = 'src/generated/graphql/schema.gql';

/**
 * 設定値の取得
 */
@Injectable()
export class EnvService {
  constructor(private configService: ConfigService) {}

  isProduction(): boolean {
    return this.configService.get('ENVIRONMENT') === 'production';
  }

  get testEnv(): string {
    return this.configService.get('TEST_ENV', 'default env');
  }

  get ApolloDriverConfigFactory(): ApolloDriverConfig {
    const devOptions: ApolloDriverConfig = {
      autoSchemaFile: path.join(process.cwd(), SCHEMA_FILE_PATH),
      sortSchema: true,
      debug: true,
      playground: false,
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
    };

    // 本番環境：実行だけ
    const prdOptions: ApolloDriverConfig = {
      driver: ApolloDriver,
      autoSchemaFile: true,
      debug: false,
      playground: false,
    };
    if (this.isProduction()) {
      return prdOptions;
    } else {
      return devOptions;
    }
  }
}
