import axios from "axios";
import { useEffect, useState } from "react";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [toggleCountries, setToggleCountries] = useState([]);
  const [weather, setWeather] = useState([]);
  const [countryName, setCountryName] = useState("");
  const apiKey = import.meta.env.VITE_API_KEY;

  useEffect(() => {
    axios
      .get("https://studies.cs.helsinki.fi/restcountries/api/all")
      .then((response) => {
        const data = response.data.filter((country) =>
          country.name.common.toLowerCase().includes(countryName.toLowerCase()),
        );
        const endpoints = data.map((country) => {
          if (country.capital) {
            return `https://api.openweathermap.org/data/2.5/weather?q=${country.capital[0]}&appid=${apiKey}&units=metric`;
          }

          return "";
        });

        axios
          .all(endpoints.map((endpoint) => axios.get(endpoint)))
          .then((response) => {
            const data = response.map((weather) => weather.data);
            setWeather(data);
          });

        setCountries(data);
        setToggleCountries(
          data.map((country) => {
            return { toggle: false };
          }),
        );
      });
  }, [countryName]);

  const changeCountryName = (e) => {
    setCountryName(e.target.value);
  };

  const toggleCountry = (index) => {
    const country = countries[index];

    setToggleCountries(
      toggleCountries.map((country, i) =>
        i == index ? { toggle: !country.toggle } : country,
      ),
    );
  };

  return (
    <div>
      <div>
        find countries:
        <input type="text" value={countryName} onChange={changeCountryName} />
      </div>
      {countries.length > 10 ? (
        <div>Too many matches</div>
      ) : countries.length == 1 ? (
        <div>
          {countries.map((country) => {
            const capital = country.capital[0];
            const languages = Object.values(country.languages);
            const flag = country.flags.png;
            const area = country.area;

            const countryWeather = weather.find(
              (country) => country.name == capital,
            );

            return (
              <div>
                <h1>{country.name.common}</h1>
                <div>
                  <div>Capital {capital}</div>
                  <div>Area {area}</div>
                </div>
                <h1>Languages</h1>
                <ul>
                  {languages.map((language) => {
                    return <li>{language}</li>;
                  })}
                </ul>
                <img src={flag} />
                <h1>Weather in {capital}</h1>
                <div>
                  Weather is {countryWeather ? countryWeather.main.temp : "Loading..."}
                  (Celsius)
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <ul>
          {countries.map((country, index) => {
            const capital = country.capital[0];
            const languages = Object.values(country.languages);
            const flag = country.flags.png;
            const area = country.area;
            const toggle = toggleCountries[index].toggle;

            const countryWeather = weather.find(
              (country) => country.name == capital,
            );

            return (
              <div key={country.name.common}>
                <li>
                  {country.name.common}
                  <button
                    onClick={() => {
                      toggleCountry(index);
                    }}
                  >
                    show
                  </button>
                </li>
                {toggle ? (
                  <div>
                    <h1>{country.name.common}</h1>
                    <div>
                      <div>Capital {capital}</div>
                      <div>Area {area}</div>
                    </div>
                    <h1>Languages</h1>
                    <ul>
                      {languages.map((language) => {
                        return <li key={language}>{language}</li>;
                      })}
                    </ul>
                    <img src={flag} />
                    <h1>Weather in {capital}</h1>
                    <div>
                      Weather is {countryWeather ? countryWeather.main.temp : "Loading... "} (Celsius)
                    </div>
                  </div>
                ) : (
                  <></>
                )}
              </div>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default App;
