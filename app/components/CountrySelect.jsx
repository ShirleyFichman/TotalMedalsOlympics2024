import React from 'react';

export default function CountrySelect({ countries, onSelectCountry }) {
    return (
        <select
          onChange={(e) => onSelectCountry(e.target.value)}
          id="countries"
          className="bg-cyan-700 text-sm text-white rounded-lg block p-2.5 dark:bg-cyan-700 dark:placeholder-gray-400 dark:text-white"
        >
          <option value="">Select a country</option>
          {countries.map((country) => (
            <option key={country.country_code} value={country.country_code}>
              {country.country_code}
            </option>
          ))}
        </select>
      );
}

