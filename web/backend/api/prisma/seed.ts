import { Logger } from '@nestjs/common';
import { PrismaClient, Prisma, Users } from '@prisma/client';

const logger = new Logger('Prisma Seed');
const prisma = new PrismaClient();

const users: Users[] = [
  {
    id: 'u1',
    name: 'komi',
    address: 'test@ex.com',
    social_account: undefined,
  },
  {
    id: 'u2',
    name: 'taka',
    address: 'test2@ex.com',
    social_account: undefined,
  },
];

const execute = async () => {
  return await prisma.$transaction(
    users.map((user) => {
      return prisma.users.create({
        data: user,
      });
    }),
  );
};

const main = async () => {
  logger.debug('Start seeding ....');
  await execute();
  logger.debug('Seeding finished');
};

main()
  .catch((e) => {
    logger.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
