import { INestApplication } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';

export * from './prisma.module';
export * from '@prisma/client';
export { PrismaService };

/**
 * It enables shutdown hooks for Prisma
 * @param {INestApplication} app - INestApplication - the Nest application instance
 */
export const setupPrisma = async (app: INestApplication) => {
  // enable shutdown hook
  const prismaService = app.get(PrismaService);
  // await prismaService.enableShutdownHooks(app);
  console.log('Setup prisma success');
};
