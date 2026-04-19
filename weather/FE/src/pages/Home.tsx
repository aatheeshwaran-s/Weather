import { useState } from "react";
import SearchBar from "../components/SearchBar";
import WeatherCard from "../components/WeatherCard";
import ErrorAlert from "../components/ErrorAlert";
import { fetchWeather } from "../services/api";
import type { WeatherData } from "../types/weather";

export default function Home() {
  const [data, setData] = useState<WeatherData | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [resetTrigger, setResetTrigger] = useState(false);

  const handleSearch = async (city: string) => {
    try {
      setLoading(true);
      setError("");
      setResetTrigger(false);

      const res = await fetchWeather(city);
      setData(res);
    } catch (err: any) {
      setError(typeof err === "string" ? err : "Error fetching data");
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setData(null);
    setError("");
    setResetTrigger(true);
  };
  return (
    <div className="container mt-5">
      <h1>Weather App</h1>

      <SearchBar onSearch={handleSearch} resetTrigger={resetTrigger} />

      {loading && <p>Loading...</p>}
      {error && <ErrorAlert message={error} />}
      {data && (
        <WeatherCard data={data} onCancel={handleCancel} />
      )}
    </div>
  );

};
