import { useState, useEffect } from 'react'
import axios from 'axios'

const COUNTRY_API_DOMAIN = 'https://restcountries.com/v3.1/';
const weather_api_key = process.env.REACT_APP_WEATHER_API_KEY;
const WEATHER_API_URL = 'https://api.openweathermap.org/data/2.5/weather?'
//https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}
const Country = ({ country }) => {
  const { name, capital, flags, population, area, coatOfArms, latlng } = country;
  const { official, common } = name;
  const { png:flag } = flags;
  const { png:crest } = coatOfArms
  const [weather, setWeather] = useState([])
  const [weatherFetched, setWeatherFetched] = useState(false);
  useEffect(() => {
    axios
    .get(
      `${WEATHER_API_URL}lat=${latlng[0]}&lon=${latlng[1]}&appid=${weather_api_key}`
    )
    .then((response) => {
      setWeather(response.data);
      setWeatherFetched(true);
    })
  }, [])
  console.log(weather);
  const languages = Object.values(country.languages);
  return (
    <div>
      <h2>{common}</h2>
      <b>Official name:</b> {official}<br/>
      <b>Capital:</b> {capital}<br/>
      <b>Population:</b> {population.toLocaleString()}<br/>
      <b>Area: </b> {area.toLocaleString()}kms<br/>
      <b>languages:</b>
      {languages.map((value) => (
        <li key={value}>{value}</li>
      ))}
      <img
        alt="flag"
        src={flag}
        style={{ width: "9.375rem", marginTop: "2rem" }}
      ></img><br/>
      <img
        alt="coatofarms.png"
        src={crest}
        style={{ width: "9.375rem", marginTop: "2rem" }}
      ></img><br/>
      <h3>Weather</h3>
      <b>Temperature: </b> {weatherFetched ? ((weather.main.temp)-273.15).toFixed(2) : 'No available data'} Celsius
    </div>
  );
}
const App = () => {
  const [newFilter, setNewFilter] = useState('');
  const [countries, setCountries] = useState([]);
  const [selectedCountries, setSelectedCountries] = useState([])
  const [weather, setWeather] = useState([]);
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