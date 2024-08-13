// __tests__/utils.test.js

import { parseCSV } from '../utils/utils';


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