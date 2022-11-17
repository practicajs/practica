// eslint-disable-next-line import/no-extraneous-dependencies
import { PrismaClient } from '.prisma/client';

const prisma = new PrismaClient();

type CountryRecord = {
  id: number;
  name: string;
};

export async function getAllCountries(): Promise<CountryRecord[]> {
  const results = prisma.country.findMany();

  return results;
}
