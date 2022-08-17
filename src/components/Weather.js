import { WEATHER_IMAGE_URL } from '../services/paths'

const Weather = ({ weatherData }) => {
  const { weather, main } = weatherData;
  const { description } = weather[0];
  const { icon } = weather[0];
  const { temp } = main;
  const image_url = `http://openweathermap.org/img/wn/${icon}@2x.png`


  console.log(weather[0]);
  return(
    <div>
      <h3>Weather</h3>
      <img src={image_url} /><br/>
      <b>Currently: </b> {description}<br/>
      <b>Temperature: </b> {((temp)-273.15).toFixed(2)} Celsius <br/>
    </div>
  )
}

export default Weather;
//http://openweathermap.org/img/wn/10d@2x.png
//'http://openweathermap.org/img/wn/'