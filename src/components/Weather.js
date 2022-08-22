import { WEATHER_IMAGE_URL } from "../services/paths";

const Weather = ({ weatherData }) => {
  const { weather, main } = weatherData;
  const { description: weatherDescription } = weather[0];
  const { icon } = weather[0];
  const { temp } = main;
  const image_url = `http://openweathermap.org/img/wn/${icon}@2x.png`;

  return (
    <div>
      <h3>Weather</h3>
      <img alt="weather icon" src={image_url} />
      <br />
      <b>Currently: </b> {weatherDescription}
      <br />
      <b>Temperature: </b> {(temp - 273.15).toFixed(2)} Celsius <br />
    </div>
  );
};
export default Weather;
