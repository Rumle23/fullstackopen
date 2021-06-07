import axios from "axios";
import React, { useEffect, useState } from "react";

const Weather = ({city}) => {
  const [weatherData, setWeatherData] = useState(null)
  const api_key = process.env.REACT_APP_API_KEY
  const weatherHook = () => {
    axios.get(`http://api.weatherstack.com/current?access_key=${api_key}&query=${city}`)
    .then(response => {
      console.log("Weather recieved")
      setWeatherData(response.data.current)
    })
  }
  useEffect(weatherHook, [city, api_key])
  if (weatherData) {
    return (
      <>
      <div><b>Temperature: </b> {weatherData.temperature}</div>
      <div><b>Wind: </b>{weatherData.wind_speed} km/h {weatherData.wind_dir}</div>
      <img src={weatherData.weather_icons[0]} alt="Weather indicator" width="100" />
      </>
    )
  }
  else {
    return <></>
  }
}

const DetailedCountry = ({ country }) => {
  return (
    <>
      <h1>{country.name}</h1>
      <p>Capital: {country.capital}</p>
      <p>Population: {country.population}</p>
      <h2>Languages</h2>
      <ul>
        {country.languages.map((language) => (
          <li key={language.name}>{language.name}</li>
        ))}
      </ul>
      <h2>Weather</h2>
      <Weather city={country.capital}/>
      <h2>Flag</h2>
      <img src={country.flag} alt="Country flag" width="200" />
    </>
  );
};

const Countries = ({ countries, setCountryInput }) => {
  if (countries.length === 0) {
    return <p>No matches</p>;
  } else if (countries.length === 1) {
    return <DetailedCountry country={countries[0]} />;
  } else if (countries.length <= 10) {
    return (
      <>
        {countries.map((country) => (
          <div key={country.name}>
            {country.name + " "}
            <button
              onClick={(event) => {
                setCountryInput(country.name);
              }}
            >
              Show
            </button>
          </div>
        ))}
      </>
    );
  } else {
    return <p>Too many matches ({countries.length}), specify another filter</p>;
  }
};

const App = () => {
  const [countryInput, setCountryInput] = useState("");
  const [countryList, setCountryList] = useState([]);
  const filteredCountries = countryList.filter((country) =>
    country.name.match(new RegExp(countryInput, "i"))
  );

  const dataHook = () => {
    axios.get("https://restcountries.eu/rest/v2/all").then((response) => {
      console.log("Promise resolved");
      setCountryList(response.data);
    });
  };

  useEffect(dataHook, []);

  return (
    <>
      <div>
        find countries{" "}
        <input
          value={countryInput}
          onChange={(event) => setCountryInput(event.target.value)}
        />
      </div>
      <Countries
        countries={filteredCountries}
        setCountryInput={setCountryInput}
      />
    </>
  );
};

export default App;
