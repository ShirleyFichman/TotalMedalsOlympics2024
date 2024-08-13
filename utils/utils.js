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
    const reader = response.body.getReader();
    const result = await reader.read();
    const decoder = new TextDecoder('utf-8');
    const csvData = decoder.decode(result.value);

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
    const reader = response.body.getReader();
    const result = await reader.read();
    const decoder = new TextDecoder('utf-8');
    const csvData = decoder.decode(result.value);

    const parsedData = parseCSV(csvData);
    return parsedData; 
  } catch (error) {
    console.error('Error fetching population data:', error);
    throw error;
  }
}

export { parseCSV, fetchMedalsTotalCSV, fetchPopulationCSV };
