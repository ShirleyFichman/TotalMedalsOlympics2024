"use client"
import { useState, useEffect } from 'react';
import Papa from 'papaparse';
import DataSection from './components/DataSection';


export default function Home() {
  const [populationData, setPopulationData] = useState([]);
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState('');
  const [totalMedals, setTotalMedals] = useState(0);
  const [ratio, setRatio] = useState(null);
  const [rank, setRank] = useState(null);

  useEffect(() => {
    async function fetchMedalsTotalCSV() {
      const response = await fetch('/medals_total.csv');
      const reader = response.body.getReader();
      const result = await reader.read();
      const decoder = new TextDecoder('utf-8');
      const csvData = decoder.decode(result.value);

      Papa.parse(csvData, {
        header: true,
        complete: (parsedData) => {
          setCountries(parsedData.data);
        },
      });
    }

    async function fetchPopulationCSV() {
      const response = await fetch('/world_population.csv');
      const reader = response.body.getReader();
      const result = await reader.read();
      const decoder = new TextDecoder('utf-8');
      const csvData = decoder.decode(result.value);

      Papa.parse(csvData, {
        header: true,
        complete: (parsedData) => {
          setPopulationData(parsedData.data);
        },
      });
    }

    fetchMedalsTotalCSV();
    fetchPopulationCSV();
  }, []);

  useEffect(() => {
    if (selectedCountry && countries.length > 0 && populationData.length > 0) {
      // Calculate ratios and ranks
      const countryData = countries.map((country) => {
        const population = populationData.find(
          (item) => item.CCA3 === country.country_code
        );
        if (population) {
          const ratioValue = country.Total / population['2022 Population'];
          return {
            ...country,
            ratio: ratioValue,
          };
        }
        return null;
      }).filter(Boolean); // Filter out null entries

      // Sort countries by ratio in descending order
      const sortedCountries = countryData.sort((a, b) => b.ratio - a.ratio);

      // Find the selected country data
      const selectedCountryData = sortedCountries.find(
        (item) => item.country_code === selectedCountry
      );

      if (selectedCountryData) {
        setTotalMedals(selectedCountryData.Total);
        setRatio(selectedCountryData.ratio.toFixed(8));
        setRank(sortedCountries.findIndex(
          (item) => item.country_code === selectedCountry
        ) + 1); // Rank is 1-based
      } else {
        setTotalMedals(0);
        setRatio('Population data not available');
        setRank(null);
      }
    }
  }, [selectedCountry, countries, populationData]);

  return (
    <div>
      <select onChange={(e) => setSelectedCountry(e.target.value)} id="countries" class="bg-gray-700 text-sm text-white rounded-lg focus:ring-gray-80 block p-2.5 dark:bg-gray-700 dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-80">
        <option value="">Select a country</option>
        {countries.map((country) => (
          <option key={country.country_code} value={country.country_code}>
            {country.country_code}
          </option>
        ))}
      </select>
      {selectedCountry && (
        <div>
          <DataSection title="Total Medals" value={totalMedals} />
          <DataSection title="Medals per Person" value={ratio !== null ? ratio : 'Loading...'} />
          <DataSection title="Rank" value={rank !== null ? rank : 'Loading...'} />
        </div>
      )}
    </div>
  );
}
