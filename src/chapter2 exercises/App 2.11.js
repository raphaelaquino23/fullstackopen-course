import { useState, useEffect } from 'react'
import axios from 'axios'

const COUNTRY_API_DOMAIN = 'https://restcountries.com/v3.1/';

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

  const displaySingleCountry = (country) => {
    const nameCommon = country.common;
    const languages = Object.values(country.languages);
    const flag = country.flags.png;
    return (
      <div>
        <h1>{nameCommon}</h1>
        languages:
        {languages.map((value) => (
          <li>{value}</li>
        ))}
        <img
          alt="flag"
          src={flag}
          style={{ width: "9.375rem", marginTop: "2rem" }}
        ></img>
      </div>
    );
  };

  const filterThroughCountries = () => {
    return selectedCountries.length === 1 ? (
      displaySingleCountry(selectedCountries[0])
    ) : selectedCountries.length < 10 ? (
      selectedCountries.map((value) => <ul>{value.name.common}</ul>)
    ) : (
      <p>Over 10 listed countries</p>
    );
  };

  return (
    <div>
      <h1>Notes</h1>
      <div>
        find countries <input value={newFilter} onChange={handleFilterChange} />
      </div>
      <ul>
      </ul>
      {filterThroughCountries() ? filterThroughCountries() : <p></p>}
      <ul>
        {/* {countries.filter((country) =>
          country.name.common.toUpperCase().includes(newFilter.toUpperCase())
        ).length < 10 ? (
          countries
            .filter((country) =>
              country.name.common
                .toUpperCase()
                .includes(newFilter.toUpperCase())
            )
            .map((value) => <li>{value.name.common}</li>)
        ) : (
          <div>Over 10 listed countries</div>
        )} */}
      </ul>
    </div>
  );
}

export default App