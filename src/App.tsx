import { useEffect, useState } from "react";
import type {
  City,
  ForecastItem,
  ForecastResponse,
  WeatherData,
} from "./types/weather";
import { getForecast, getWeather } from "./api/weather";
import LocationSelect from "./components/LocationSelect/LocationSelect";
import Loader from "./components/Loader/Loader";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage";
import { CurrentWeather } from "./components/CurrentWeather/CurrentWeather";
import DailyForecast from "./components/DailyForecast/DailyForecast";

const SEVASTOPOL_COORDS = { lat: 44.6, lon: 33.5 };

function App() {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [forecastData, setForecastData] = useState<ForecastResponse | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [coords, setCoords] = useState(SEVASTOPOL_COORDS);

  const fetchWeather = async (lat: number, lon: number) => {
    setLoading(true);
    setError(null);
    try {
      const [weather, forecast] = await Promise.all([
        getWeather(lat, lon),
        getForecast(lat, lon),
      ]);

      setWeatherData(weather);
      setForecastData(forecast);
    } catch (error) {
      setError("Не удалось загрузить данные о погоде");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather(SEVASTOPOL_COORDS.lat, SEVASTOPOL_COORDS.lon);
  }, []);

  const handleRetry = () => {
    fetchWeather(coords.lat, coords.lon);
  };

  const handleCitySelect = (city: City) => {
    setCoords({ lat: city.lat, lon: city.lon });
    fetchWeather(city.lat, city.lon);
  };

  const groupForecastByDay = (forecast: ForecastResponse) => {
    const dailyData: Record<string, ForecastItem[]> = {};

    forecast.list.forEach((item) => {
      const date = new Date(item.dt * 1000).toLocaleDateString();
      if (!dailyData[date]) {
        dailyData[date] = [];
      }
      dailyData[date].push(item);
    });

    return Object.entries(dailyData)
      .map(([_, items]) => {
        const dayItem =
          items.find((item) => item.dt_txt.includes("12:00:00")) || items[0];

        return {
          dt: dayItem.dt,
          temp: {
            day: dayItem.main.temp,
            night: items[items.length - 1].main.temp,
          },
          weather: dayItem.weather,
          wind_speed: dayItem.wind.speed,
        };
      })
      .slice(0, 7);
  };

  return (
    <>
      <div className="app">
        <h1 className="weather-title">Погодное приложение</h1>
        <div className="location-controls">
          <button
            onClick={() =>
              fetchWeather(SEVASTOPOL_COORDS.lat, SEVASTOPOL_COORDS.lon)
            }
            className="weatherButton"
          >
            Севастополь
          </button>
          <button
            onClick={() => {
              if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                  (position) => {
                    const { latitude, longitude } = position.coords;
                    setCoords({ lat: latitude, lon: longitude });
                    fetchWeather(latitude, longitude);
                  },
                  () => setError("Не удалось получить ваше местоположение")
                );
              }
            }}
            className="weatherButton"
          >
            Моё местоположение
          </button>
          <LocationSelect onSelect={handleCitySelect} />
        </div>
        {loading && <Loader />}
        {error && <ErrorMessage message={error} onRetry={handleRetry} />}
        {!loading && !error && weatherData && (
          <>
            <CurrentWeather
              data={{
                temp: weatherData.main.temp,
                feels_like: weatherData.main.feels_like,
                wind_speed: weatherData.wind.speed,
                weather: weatherData.weather,
                dt: weatherData.dt,
                name: weatherData.name,
              }}
            />
            {forecastData && (
              <DailyForecast forecast={groupForecastByDay(forecastData)} />
            )}
          </>
        )}
      </div>
    </>
  );
}

export default App;
