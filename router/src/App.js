import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';
import WeatherBox from './component/WeatherBox';
import WeatherButton from './component/WeatherButton';
import ClipLoader from "react-spinners/ClipLoader";

const Weather_API_key = process.env.REACT_APP_OPEN_WEATHER_API_KEY

function App() {
  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState(null);
  const [loading, setLoading] = useState(false);
  const [apiError, setAPIError] = useState("");
  const cities = ['London', 'New York', 'Tokyo', 'Paris', 'Berlin', 'Madrid', 'Rome', 'Moscow', 'Beijing', 'Sydney'];

  const getCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      let lat = position.coords.latitude;
      let lon = position.coords.longitude;
      getWeatherByCurrentLocation(lat, lon);
    });
  }

  const getWeatherByCurrentLocation = async (lat, lon) => {
    try {
      let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${Weather_API_key}&units=metric`;
      setLoading(true);
      let response = await fetch(url);
      let data = await response.json();
      setWeather(data);
      setLoading(false);
    } catch (error) {
      setAPIError(error.message);
      setLoading(false);   
    }
  }

  const getWeatherByCity = async () => {
    try {
      let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${Weather_API_key}&units=metric`;
      setLoading(true);
      let response = await fetch(url);
      let data = await response.json();
      setWeather(data);
      setLoading(false);  
    } catch (error) {
      setAPIError(error.message);
      setLoading(false);
    }
  } 

  useEffect(() => {
    if (city === null) {
      getCurrentLocation();
    } else {
      getWeatherByCity();
    }
  }, [city]);

  const handleCityChange = (city) => {
    if (city === "current") {
      setCity(null);
    } else {
      setCity(city);
    }
  }

  return (
    <div>
      {loading? 
        (
        <div className='container'>
          <ClipLoader color="#ff0000" loading={loading} size={150} />
        </div>
        )
      : !apiError ?
        (
        <div className='container'>
          <WeatherBox weather={weather}/>
          <WeatherButton cities={cities} selectedCity={city} handleCityChange={handleCityChange}/>
        </div>
        )
      : (
        apiError
        )
      }
    </div>
  )
}

export default App;
