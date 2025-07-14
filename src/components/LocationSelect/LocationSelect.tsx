import { useEffect, useState } from "react";
import type { City } from "../../types/weather";
import { searchCities } from "../../api/weather";
import styles from "./LocationSelect.module.css";

interface LocationSelectProps {
  onSelect: (city: City) => void;
}

const LocationSelect = ({ onSelect }: LocationSelectProps) => {
  const [query, setQuery] = useState("");
  const [cities, setCities] = useState<City[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (query.trim().length > 2) {
      setIsLoading(true);
      const timer = setTimeout(async () => {
        try {
          const data = await searchCities(query);
          setCities(data);
        } catch (error) {
          console.error("Ошибка поиска:", error);
        } finally {
          setIsLoading(false);
        }
      }, 500);

      return () => clearTimeout(timer);
    } else {
      setCities([]);
    }
  }, [query]);

  return (
    <div className={styles.locationSelect}>
      <input
        type="text"
        placeholder="Moscow..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className={styles.locationInput}
      />
      {isLoading && <p>Загрузка ...</p>}
      {cities.length > 0 && (
        <ul className={styles.citiesSuggestions}>
          {cities.map((city) => (
            <li
              key={`${city.lat}-${city.lon}`}
              className={styles.suggestionsInner}
              onClick={() => {
                setQuery("");
                setCities([]);
                onSelect(city);
              }}
            >
              {city.name}, {city.country}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default LocationSelect;
