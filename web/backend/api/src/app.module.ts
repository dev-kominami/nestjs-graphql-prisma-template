import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { UsersModule } from './components/users/users.module';
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
})
export class AppModule {}
