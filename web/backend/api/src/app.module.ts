import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
// import { PbEnv } from '@config/environments/pb-env.service';
import { UsersModule } from './components/users/users.module';
import * as path from 'path';
import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core';
import { PrismaService } from '@prisma-service';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: path.join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
      playground: false,
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
    }),
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}

// GraphQLModule.forRootAsync<ApolloDriverConfig>({
//   inject: [PbEnv],
//   useFactory: (env: PbEnv) => env.ApolloDriverConfigFactory,
// }),
