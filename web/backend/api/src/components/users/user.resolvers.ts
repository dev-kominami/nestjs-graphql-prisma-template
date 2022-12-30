import { Args, Query, Resolver } from '@nestjs/graphql';
import { UserModel } from './interfaces/user.model';
import { PrismaService } from '@prisma-module/prisma.service';
import { ConfigService } from '@nestjs/config';

@Resolver((of) => UserModel)
export class UserResolver {
  constructor(
    private prisma: PrismaService,
    private configService: ConfigService,
  ) {}

  @Query(() => [UserModel], { name: 'users', nullable: true })
  async getUsers() {
    return this.prisma.users.findMany();
  }

  @Query(() => String)
  async getEnv() {
    return this.configService.get('TEST_ENV', 'default');
  }
}
