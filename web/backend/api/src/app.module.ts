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

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: path.join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
      playground: false,
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
    }),
    ConfigModule.forRoot({
      envFilePath: ['.env.development.local'],
      isGlobal: true,
    }),
    PrismaModule,
    UsersModule,
  ],
  // controllers: [AppController],
  // providers: [PrismaService],
})
export class AppModule {}

// GraphQLModule.forRootAsync<ApolloDriverConfig>({
//   inject: [PbEnv],
//   useFactory: (env: PbEnv) => env.ApolloDriverConfigFactory,
// }),
