import axios from "axios";
import type { City } from "../types/weather";

const API_KEY = import.meta.env.OPENWEATHER_API_KEY;

export const getWeather = async (lat: number, lon: number) => {
  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching weather data:", error);
    throw error;
  }
};

export const searchCities = async (query: string) => {
  try {
    const response = await axios.get<City[]>(
      `https://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=5&appid=${API_KEY}`
    );
    return response.data;
  } catch (error) {
    console.error("Error searching cities:", error);
    throw error;
  }
};
