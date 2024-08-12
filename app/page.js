"use client"
import { useState, useEffect } from 'react';
import CountryDataSections from './components/DataSection';
import CountrySelect from './components/CountrySelect';
import { fetchMedalsTotalCSV, fetchPopulationCSV } from '../utils/utils';

export default function Home() {
  const [populationData, setPopulationData] = useState([]);
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState('');
  const [totalMedals, setTotalMedals] = useState(0);
  const [ratio, setRatio] = useState(null);
  const [rank, setRank] = useState(null);

  useEffect(() => {
    loadCountriesData();
  }, []);

  useEffect(() => {
    if (selectedCountry && countries.length > 0 && populationData.length > 0) {
      const countriesRatios = calculateCountryRatio(countries, populationData);
      const sortedCountriesByRatio = countriesRatios.sort((a, b) => b.ratio - a.ratio);

      const selectedCountryData = sortedCountriesByRatio.find(
        (item) => item.country_code === selectedCountry
      );

      if (selectedCountryData) {
        setTotalMedals(selectedCountryData.Total);
        setRatio(selectedCountryData.ratio.toFixed(8));
        setRank(sortedCountriesByRatio.findIndex(
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
      <CountrySelect 
        countries={countries} 
        onSelectCountry={setSelectedCountry} 
      />
      <CountryDataSections 
        selectedCountry={selectedCountry} 
        totalMedals={totalMedals} 
        ratio={ratio} 
        rank={rank} 
      />
    </div>
  );

  async function loadCountriesData() {
    try {
      const [medalsData, populationData] = await Promise.all([
        fetchMedalsTotalCSV(),
        fetchPopulationCSV(),
      ]);

      setCountries(medalsData);
      setPopulationData(populationData);
    } catch (error) {
      console.error('Error loading data:', error);
    }
  }

  function calculateCountryRatio(countries, populationData) {
    return countries.map((country) => {
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
    }).filter(Boolean);
  }
}
