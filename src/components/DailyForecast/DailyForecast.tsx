import type { dailyForecast } from "../../types/weather";

import styles from "./DailyForecast.module.css";

interface DailyForecastProps {
  forecast: dailyForecast[];
}

const DailyForecast = ({ forecast }: DailyForecastProps) => {
  const formDate = (time: number) => {
    const date = new Date(time * 1000);
    return date.toLocaleDateString("ru-RU", { weekday: "long" });
  };

  return (
    <div className={styles.dailyForecast}>
      <h2 className={styles.forecastTitle}>Недельный прогноз</h2>
      <div className={styles.forecastList}>
        {forecast.map((day) => {
          const weather = day.weather[0];
          const iconUrl = `https://openweathermap.org/img/wn/${weather.icon}@2x.png`;

          return (
            <div key={day.dt} className={styles.forecastItems}>
              <h3>{formDate(day.dt)}</h3>
              <img src={iconUrl} alt={weather.main} />
              <p>Состояник: {weather.main}</p>
              <p>Днём: {Math.round(day.temp.day)} °C</p>
              <p>Ночью: {Math.round(day.temp.night)} °C</p>
              <p>Ветер: {day.wind_speed} м/c</p>
              <p className={styles.forecastSummary}>{day.summary}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DailyForecast;
