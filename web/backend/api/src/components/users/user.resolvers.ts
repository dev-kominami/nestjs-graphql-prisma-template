import { Args, Query, Resolver } from '@nestjs/graphql';
import { UserModel } from './interfaces/user.model';
import { PrismaService } from '@prisma-module/prisma.service';
import { ConfigService } from '@nestjs/config';
import { EnvService } from '../../config/environments/env.service';

@Resolver((of) => UserModel)
export class UserResolver {
  constructor(
    private prisma: PrismaService,
    private configService: ConfigService,
    private envService: EnvService,
  ) {}

  @Query(() => [UserModel], { name: 'users', nullable: true })
  async getUsers() {
    return this.prisma.users.findMany();
  }

  // debug用
  @Query(() => String)
  async getEnv() {
    return this.envService.testEnv;
  }
}
