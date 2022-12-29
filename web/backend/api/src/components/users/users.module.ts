import { Module } from '@nestjs/common';
import { UserResolver } from './user.resolvers';
import { PrismaService } from '@prisma-service';

@Module({
  providers: [UserResolver, PrismaService],
})
export class UsersModule {}
