export interface Weather {
  id: number;
  main: string;
  description: string;
  icon: string;
}

export interface CurrentWeatherProp {
  dt: number;
  temp: number;
  feels_like: number;
  wind_speed: number;
  weather: Weather[];
}

export interface City {
  name: string;
  lat: number;
  lot: number;
  country: string;
}

export interface DailyForecast {
  dt: number;
  temp: {
    day: number;
    night: number;
  };
  weather: Weather[];
  wind_speed: number;
  summary: string;
}
