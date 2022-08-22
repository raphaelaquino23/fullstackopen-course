import { useState, useEffect } from "react";
import axios from "axios";

import { COUNTRY_API_DOMAIN } from "./services/paths";
import Country from "./components/Country";

const App = () => {
  const [newFilter, setNewFilter] = useState("");
  const [countries, setCountries] = useState([]);
  const [selectedCountries, setSelectedCountries] = useState([]);
  const [countrySelected, setCountrySelected] = useState(null);

  useEffect(() => {
    axios.get(`${COUNTRY_API_DOMAIN}/all`).then((response) => {
      setCountries(response.data);
    });
  }, []);

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value);
    setSelectedCountries(
      countries
        .filter((country) =>
          country.name.common
            .toUpperCase()
            .includes(
              newFilter.toUpperCase() ||
                country.name.toUpperCase() === newFilter.toUpperCase()
            )
        )
        .map((value) => value)
    );
  };

  const filterThroughCountries = () => {
    return !selectedCountries.length ? null : selectedCountries.length === 1 ? (
      <Country country={selectedCountries[0]} />
    ) : countrySelected != null ? (
      <Country country={countrySelected} />,
      setCountrySelected(null)
    ) : selectedCountries.length < 10 ? (
      selectedCountries.map((value) => (
        <div>
          <ul>
            {value.name.common}{" "}
            <button onClick={() => setCountrySelected(value)}>View country</button>
          </ul>
        </div>
      ))
    ) : (
      <p>Too many search results</p>
    );
  };

  return (
    <div>
      <h1>Countries of the World</h1>
      <div>
        find countries <input value={newFilter} onChange={handleFilterChange} />
      </div>
      <ul></ul>
      {filterThroughCountries() ? filterThroughCountries() : <p></p>}
    </div>
  );
};

export default App;
