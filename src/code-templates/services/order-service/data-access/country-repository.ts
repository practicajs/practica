import { getCountryModel } from './models/country-model';

type CountryRecord = {
  id: number;
  name: string;
};

// ️️️✅ Best Practice: The repository pattern - Wrap the entire DB layer with a simple interface that returns plain JS objects
export async function getAllCountries(): Promise<CountryRecord[] | null> {
  const results = getCountryModel().findAll();

  return results;
}
