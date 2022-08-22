import { useState, useEffect } from 'react';
import axios from 'axios';

import { COUNTRY_API_DOMAIN } from './services/paths';
import Country from './components/Country';

const App = () => {
  const [newFilter, setNewFilter] = useState('');
  const [countries, setCountries] = useState([]);
  const [selectedCountries, setSelectedCountries] = useState([])
  useEffect(() => {
      axios
        .get(`${COUNTRY_API_DOMAIN}/all`)
        .then((response) => {
          setCountries(response.data);
        })
  }, []);
  
  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
    setSelectedCountries(countries
      .filter((country) =>
        country.name.common.toUpperCase().includes(newFilter.toUpperCase())
      )
      .map((value) => value))
  }

  const filterThroughCountries = () => {
    return !selectedCountries.length ? null : selectedCountries.length === 1 ? (
      <Country country={selectedCountries[0]}/>
    ) : selectedCountries.length < 10 ? (
      selectedCountries.map((value) => <ul>{value.name.common}</ul>)
    ) : (
      <p>Over 10 listed countries</p>
    );
  };

  return (
    <div>
      <h1>Countries of the World</h1>
      <div>
        find countries <input value={newFilter} onChange={handleFilterChange} />
      </div>
      <ul>
      </ul>
      {filterThroughCountries() ? filterThroughCountries() : <p></p>}
    </div>
  );
}

export default App