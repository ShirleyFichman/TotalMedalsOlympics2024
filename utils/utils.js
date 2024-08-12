// utils/utils.js

import Papa from 'papaparse';

// Parse CSV data synchronously without Promises
function parseCSV(csvData) {
  const parsedResult = Papa.parse(csvData, {
    header: true,
  });
  return parsedResult.data; // Return parsed data
}

// Fetch and parse medals_total.csv
export async function fetchMedalsTotalCSV() {
  try {
    const response = await fetch('/medals_total.csv');
    const reader = response.body.getReader();
    const result = await reader.read();
    const decoder = new TextDecoder('utf-8');
    const csvData = decoder.decode(result.value);

    const parsedData = parseCSV(csvData);
    return parsedData; // Return the parsed data
  } catch (error) {
    console.error('Error fetching medals data:', error);
    throw error;
  }
}

// Fetch and parse world_population.csv
export async function fetchPopulationCSV() {
  try {
    const response = await fetch('/world_population.csv');
    const reader = response.body.getReader();
    const result = await reader.read();
    const decoder = new TextDecoder('utf-8');
    const csvData = decoder.decode(result.value);

    const parsedData = parseCSV(csvData);
    return parsedData; // Return the parsed data
  } catch (error) {
    console.error('Error fetching population data:', error);
    throw error;
  }
}
