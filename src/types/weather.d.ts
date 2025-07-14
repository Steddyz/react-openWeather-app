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
  name?: string;
}

export interface City {
  name: string;
  lat: number;
  lon: number;
  country: string;
}

export interface dailyForecast {
  dt: number;
  temp: {
    day: number;
    night: number;
  };
  weather: Weather[];
  wind_speed: number;
  summary?: string;
}

export interface ForecastResponse {
  list: ForecastItem[];
}

export interface ForecastItem {
  dt: number;
  main: {
    temp: number;
    feels_like: number;
  };
  weather: Weather[];
  wind: {
    speed: number;
  };
  dt_txt: string;
}

export interface WeatherData {
  weather: Weather[];
  main: {
    temp: number;
    feels_like: number;
  };
  wind: {
    speed: number;
  };
  name: string;
  dt: number;
  daily: DailyForecast[];
}
