import { useState, useEffect } from 'react'
import axios from 'axios'

import { WEATHER_API_URL, WEATHER_IMAGE_URL, weather_api_key} from '../services/paths';
import Weather from './Weather';

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
      {weatherFetched ? <Weather weatherData={weather} /> : 'No available weather data'}
    </div>
  );
}

export default Country