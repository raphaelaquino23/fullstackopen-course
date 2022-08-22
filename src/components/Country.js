import { useState, useEffect } from 'react'
import axios from 'axios'

import { WEATHER_API_URL, weather_api_key} from '../services/paths';
import Weather from './Weather';

const Country = ({ country }) => {
  const { name: countryName, capital: countryCapital, flags, population, area: countryArea, coatOfArms, latlng } = country;
  const { countryOfficialName, countryCommonName } = countryName;
  const { png: flag } = flags;
  const { png: crest } = coatOfArms;
  const [weather, setWeather] = useState([]);
  const [weatherFetched, setWeatherFetched] = useState(false);

  useEffect(() => {
    axios
      .get(
        `${WEATHER_API_URL}lat=${latlng[0]}&lon=${latlng[1]}&appid=${weather_api_key}`
      )
      .then((response) => {
        setWeather(response.data);
        setWeatherFetched(true);
      });
  }, []);

  console.log(country.languages);
  const languages = Object.values(country.languages);
  return (
    <div>
      <h2>{countryCommonName}</h2>
      <b>Official name:</b> {countryOfficialName} <br />
      <b>Capital:</b> {countryCapital} <br />
      <b>Population:</b> {population.toLocaleString()}<br />
      <b>Area: </b> {countryArea.toLocaleString()}kms<br />
      <b>languages:</b>
      {languages.map((value) => <li key={value}>{value}</li>)}
      {<img alt="flag" src={flag} style={{width: "9.375rem", marginTop: "2rem"}} /> || "no flag detected"}<br />
      {<img alt="coatofarms.png" src={crest} style={{ width: "9.375rem", marginTop: "2rem" }}/>|| "no country of arms detected"}<br />
      {weatherFetched ? <Weather weatherData={weather} /> : "No available weather data"}
    </div>
  );
};

export default Country;