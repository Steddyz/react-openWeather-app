import type { CurrentWeatherProp } from "../../types/weather";
import styles from "./CurrentWeather.module.css";

interface CurrentWeatherProps {
  data: CurrentWeatherProp;
}

export const CurrentWeather = ({ data }: CurrentWeatherProps) => {
  const weather = data.weather[0];
  const iconUrl = `https://openweathermap.org/img/wn/${weather.icon}@2x.png`;

  return (
    <div className={styles.currentWeather}>
      <h2 className={styles.title}>Текущая погода</h2>
      <div className={styles.weatherInfo}>
        <img src={iconUrl} alt={weather.main} />
        <div>
          <p>Состояние: {weather.main}</p>
          <p>Температура: {Math.round(data.temp)} °C</p>
          <p>Скорость ветра: {data.wind_speed} м/с</p>
        </div>
      </div>
    </div>
  );
};
