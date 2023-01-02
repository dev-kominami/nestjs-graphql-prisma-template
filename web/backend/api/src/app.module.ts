import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
// import { PbEnv } from '@config/environments/pb-env.service';
import { UsersModule } from './components/users/users.module';
import * as path from 'path';
import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from '@prisma-module/prisma.module';
import { EnvModule } from './config/environments/env.module';
import { EnvService } from './config/environments/env.service';

@Module({
  imports: [
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      inject: [EnvService],
      useFactory: (env: EnvService) => env.ApolloDriverConfigFactory,
    }),
    PrismaModule,
    UsersModule,
    EnvModule,
  ],
  // controllers: [AppController],
  // providers: [PrismaService],
})
export class AppModule {}
