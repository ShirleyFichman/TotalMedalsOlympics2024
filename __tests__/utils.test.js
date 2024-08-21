// __tests__/utils.test.js

import { parseCSV, fetchMedalsTotalCSV, fetchPopulationCSV } from '../utils/utils';

describe('parseCSV', () => {
  it('should parse CSV data correctly', () => {
    const csvData = `country_code,Total\nUSA,100\nGBR,60\n`;
    const expectedResult = [
      { country_code: 'USA', Total: '100' },
      { country_code: 'GBR', Total: '60' },
    ];

    const result = parseCSV(csvData);

    expect(result).toEqual(expectedResult);
  });

  it('should return an empty array when CSV data is empty', () => {
    const csvData = ``;
    const expectedResult = [];

    const result = parseCSV(csvData);

    expect(result).toEqual(expectedResult);
  });
});

describe('Country and Population Data Matching', () => {
  let countries;
  let populationData;

  beforeAll(async () => {
    try {
      [countries, populationData] = await Promise.all([
        fetchMedalsTotalCSV(),
        fetchPopulationCSV(),
      ]);
      expect(countries).toBeDefined();
      expect(populationData).toBeDefined();
      expect(countries.length).toBeGreaterThan(0);
      expect(populationData.length).toBeGreaterThan(0);
      console.log("FINISH BEFOREALL");
    } catch (error) {
      console.error('Error fetching CSV data:', error);
    }
  });

  it('should find a matching population entry for every country in the countries data', () => {
    countries.forEach((country) => {
      const matchingPopulation = populationData.find(
        (item) => item.CCA3 === country.country_code
      );

      if (!matchingPopulation) {
        console.log(`No matching population found for country_code: ${country.country_code}`);
        expect(matchingPopulation).toBeTruthy();
      }
    });
  });
});
