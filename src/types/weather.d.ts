export interface Weather {
  id: number;
  main: string;
  description: string;
  icon: string;
}

export interface currentWeather {
  dt: number;
  temp: number;
  feels_like: number;
  wind_speed: number;
  weather: Weather[];
}
