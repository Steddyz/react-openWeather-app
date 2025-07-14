import type { CurrentWeatherProp } from "../../types/weather";
import styles from "./CurrentWeather.module.css";

interface CurrentWeatherProps {
  data: CurrentWeatherProp;
}

export const CurrentWeather = ({ data }: CurrentWeatherProps) => {
  if (!data.weather || data.weather.length === 0) {
    return <div>Нет данных о погоде</div>;
  }

  const weather = data.weather[0];
  const iconUrl = `https://openweathermap.org/img/wn/${weather.icon}@2x.png`;

  return (
    <div className={styles.currentWeather}>
      <div className={styles.whiteBreak} />
      <h2 className={styles.title}>
        {data.name ? `Текущая погода в ${data.name}` : "Текущая погода"}
      </h2>

      <div className={styles.weatherInfo}>
        <img src={iconUrl} alt={weather.main} />
        <div>
          <p className={styles.weatherItem}>Состояние: {weather.main}</p>
          <p className={styles.weatherItem}>
            Температура: {Math.round(data.temp)} °C
          </p>
          <p className={styles.weatherItem}>
            Скорость ветра: {data.wind_speed} м/с
          </p>
        </div>
      </div>
    </div>
  );
};
