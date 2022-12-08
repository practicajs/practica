/* eslint-disable @typescript-eslint/no-non-null-assertion */
// eslint-disable-next-line import/no-extraneous-dependencies
import { PrismaClient } from '.prisma/client';
import * as configurationProvider from '@practica/configuration-provider';

let prismaClientInstance: PrismaClient | undefined;

export function getPrismaClient() {
  if (!prismaClientInstance) {
    const connectionString = `postgresql://${configurationProvider.getValue(
      'DB.userName'
    )}:${configurationProvider.getValue(
      'DB.password'
    )}@${configurationProvider.getValue(
      'DB.url'
    )}:${configurationProvider.getValue('DB.port')}/shop?schema=public`;
    prismaClientInstance = new PrismaClient({
      datasources: {
        db: {
          url: connectionString,
        },
      },
    });
  }

  return prismaClientInstance!;
}
