"use client"
import React from "react";
import { useState, useEffect } from 'react';
import CountryDataSections from './components/DataSection';
import CountrySelect from './components/CountrySelect';
import { fetchMedalsTotalCSV, fetchPopulationCSV } from '../utils/utils';

export default function Home() {
  const [populationData, setPopulationData] = useState([]);
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState('');
  const [totalMedals, setTotalMedals] = useState(0);
  const [rank, setRank] = useState(null);
  const [sortedCountriesByRatio, setSortedCountriesByRatio] = useState([]);

  useEffect(() => {
    loadCountriesData();
  }, []);

  useEffect(() => {
    if (selectedCountry && countries.length > 0 && populationData.length > 0) {
      const selectedCountryData = sortedCountriesByRatio.find(
        (country) => country.country_code === selectedCountry
      );

      if (selectedCountryData) {
        setTotalMedals(selectedCountryData.Total);
        setRank(sortedCountriesByRatio.findIndex(
          (country) => country.country_code === selectedCountry
        ) + 1); // Rank is 1-based
      } else {
        setTotalMedals(0);
        setRank(null);
      }
    }
  }, [selectedCountry, countries, populationData]);

  async function loadCountriesData() {
    try {
      const [medalsData, populationData] = await Promise.all([
        fetchMedalsTotalCSV(),
        fetchPopulationCSV(),
      ]);
  
      setCountries(medalsData);
      setPopulationData(populationData);
  
      const countriesRatios = calculateCountryRatio(medalsData, populationData);
      const sortedCountriesByRatio = countriesRatios.sort((a, b) => b.ratio - a.ratio);
      setSortedCountriesByRatio(sortedCountriesByRatio);
  
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

  return (
    <div className="mx-6 my-10">
      <CountrySelect
        countries={countries} 
        onSelectCountry={setSelectedCountry} 
      />
      <CountryDataSections
        selectedCountry={selectedCountry} 
        totalMedals={totalMedals} 
        rank={rank} 
      />
    </div>
  );
}
