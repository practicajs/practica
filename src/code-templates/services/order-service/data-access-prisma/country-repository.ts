import { getPrismaClient } from './prisma-client-factory';

type CountryRecord = {
  id: number;
  name: string;
};

export async function getAllCountries(): Promise<CountryRecord[]> {
  const results = getPrismaClient().country.findMany();

  return results;
}
