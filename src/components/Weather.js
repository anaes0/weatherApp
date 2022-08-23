import { useState } from "react";
import axios from "axios";
import "./Weather.css";

function Weather() {
  //const weather
  const [weather, setWeather] = useState("");
  const [mainWeather, setMainWeather] = useState("");
  const [temperature, setTemperature] = useState("");
  const [maxTemp, setMaxTemp] = useState("");
  const [minTemp, setMinTemp] = useState("");
  const [tempFeelsLike, setTempFeelsLike] = useState("");
  const [humidity, setHumidity] = useState("");
  const [windspeed, setWindSpeed] = useState("");
  //const location
  const [location, setLocation] = useState("");
  const [long, setLong] = useState("");
  const [lat, setLat] = useState("");

  const [query, setQuery] = useState(" ");
  const [error, setError] = useState("");
  const placeholder = "Enter a city ...";

  const current = new Date();
  const date = `${current.getDate()}/${
    current.getMonth() + 1
  }/${current.getFullYear()}`;

  function handleSearchQuery(e) {
    e.preventDefault();
    setQuery(e.target.value);
  }

  async function searchWeather(e) {
    e.preventDefault();
    var response;
    setError("");
    try {
      response = await axios.get(
        "http://api.openweathermap.org/data/2.5/weather",
        {
          params: {
            mode: "json",
            q: query,
            appid: "319ed12bbe7a9e30cfdca428225c418b",
          },
        }
      );
      setTemperature(Math.round(response.data.main.feels_like - 273.15)); // Convert k to celsius degrees ---- C = K - 273.15
      setWeather(response.data.weather[0].description); //Math.round used to eliminate decimals
      setMainWeather(response.data.weather[0].main);
      setMaxTemp(Math.round(response.data.main.temp_max - 273.15));
      setMinTemp(Math.round(response.data.main.temp_min - 273.15));
      setTempFeelsLike(Math.round(response.data.main.feels_like - 273.15));
      setHumidity(response.data.main.humidity);
      setWindSpeed(response.data.wind.speed);

      setLocation(response.data.name);
      //console.log(location);
      setLat(response.data.coord.lat);
      setLong(response.data.coord.lat);
    } catch (e) {
      if (e.response.status === 404) {
        setError(
          `Sorry, weather data for ${query.toUpperCase()} could not be found.`
        );
        setWeather("");
      } else {
        setError(
          "The weather data could not be retrieved please try again later and make sure you are connected to the internet"
        );
        setWeather("");
      }
    }
  }

  if (weather) {
    return (
      <>
        <div className="container">
          <div className="query-leftside">
            <h1 className="text-title">Weather Forecast </h1>
            <input
              value={query}
              name="query"
              placeholder={placeholder}
              onChange={handleSearchQuery}
            />
            <button className="search-btn" onClick={searchWeather}>
              {" "}
              Search
            </button>
            <br />
          </div>
          <div className="info-rightside">
            <h1 className="today-text">Today</h1>
            <div className="weather-container">
              <div className="weather-container-left">
                <h4 className="temp-info">{temperature}°C</h4>
                <h3 className="mainweather-info">{mainWeather}</h3>
                <h4 className="weather-info">{weather}</h4>
                <h4 className="date-info">Date: {date}</h4>
              </div>

              <div className="weather-container-right">
                <h4 className="weather-details">
                  {" "}
                  Feels like: {tempFeelsLike}°C
                </h4>
                <h4 className="weather-details"> Humidity: {humidity} %</h4>
                <h4 className="weather-details">
                  {" "}
                  Wind speed: {windspeed} Km/h
                </h4>
                <h4 className="weather-details"> Max temp: {maxTemp} °C</h4>
                <h4 className="weather-details"> Min temp: {minTemp} °C</h4>
              </div>
            </div>
            <div className="location-container">
              Location
              <h4 className="location-details">
                {" "}
                City: {location} ({lat}, {long})
              </h4>
            </div>
          </div>
        </div>
      </>
    );
  } else if (error) {
    return (
      <div className="container">
        <div className="query-leftside">
          <h1 className="text-title">Weather Forecast </h1>
          <input
            value={query}
            placeholder={placeholder}
            name="query"
            onChange={handleSearchQuery}
          />
          <button className="search-btn" onClick={searchWeather}>
            {" "}
            Search
          </button>
          <h1 className="error-msg">{error}</h1>
        </div>
        <div className="info-rightside"></div>
      </div>
    );
  } else {
    return (
      <div className="container">
        <div className="query-leftside">
          <h1 className="text-title"> Weather Forecast </h1>
          <input
            className="user-input"
            value={query}
            placeholder={placeholder}
            name="query"
            onChange={handleSearchQuery}
          />

          <button className="search-btn" onClick={searchWeather}>
            {" "}
            Search
          </button>
        </div>
        <div className="info-rightside"></div>
      </div>
    );
  }
}

export default Weather;
