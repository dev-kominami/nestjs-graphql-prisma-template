import { Args, Query, Resolver } from '@nestjs/graphql';
import { UserModel } from './interfaces/user.model';
import { PrismaService } from '@prisma-service';

@Resolver((of) => UserModel)
export class UserResolver {
  constructor(private prisma: PrismaService) {}

  @Query(() => [UserModel], { name: 'users', nullable: true })
  async getUsers() {
    return this.prisma.users.findMany();
  }
}
