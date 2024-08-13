import React from 'react';

function DataSection({ title, value }) {
  return (
    <div className="my-6">
      <h2>{title}</h2>
      <p>{value}</p>
    </div>
  );
}

function CountryDataSections({ selectedCountry, totalMedals, rank }) {
  if (!selectedCountry) return null;

  return (
    <div>
      <DataSection title="Total Medals:" value={totalMedals} />
      <DataSection title="Medal rank in relation to population size:" value={rank !== null ? rank : 'Loading...'} />
    </div>
  );
}

export default CountryDataSections;
