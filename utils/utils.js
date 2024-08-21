import Papa from 'papaparse';

function parseCSV(csvData) {
  const parsedResult = Papa.parse(csvData, {
    header: true,
    skipEmptyLines: true,
  });
  return parsedResult.data;
}

async function fetchMedalsTotalCSV() {
  try {
    const response = await fetch('/medals_total.csv');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const csvData = await response.text(); 

    const parsedData = parseCSV(csvData);
    parsedData.sort((a, b) => a.country_code.localeCompare(b.country_code));
    
    return parsedData; 
  } catch (error) {
    console.error('Error fetching medals data:', error);
    throw error;
  }
}

async function fetchPopulationCSV() {
  try {
    const response = await fetch('/world_population.csv');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const csvData = await response.text(); 

    const parsedData = parseCSV(csvData);
    return parsedData; 
  } catch (error) {
    console.error('Error fetching population data:', error);
    throw error;
  }
}

export { parseCSV, fetchMedalsTotalCSV, fetchPopulationCSV };
