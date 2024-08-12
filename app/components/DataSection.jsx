import React from 'react';

function DataSection({ title, value }) {
  return (
    <div className="my-4">
      <h2>{title}</h2>
      <p>{value}</p>
    </div>
  );
}

function CountryDataSections({ selectedCountry, totalMedals, ratio, rank }) {
  if (!selectedCountry) return null;

  return (
    <div>
      <DataSection title="Total Medals:" value={totalMedals} />
      {/* <DataSection title="Medals per Person" value={ratio !== null ? ratio : 'Loading...'} /> */}
      <DataSection title="Medal rank in relation to population size:" value={rank !== null ? rank : 'Loading...'} />
    </div>
  );
}

export default CountryDataSections;
