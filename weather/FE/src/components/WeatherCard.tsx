import type{ WeatherData } from "../types/weather";
//import WeatherIcon from "./WeatherIcon";
import { saveWeather } from "../services/api";
import { useState } from "react";

interface Props {
  data: WeatherData;
  onCancel: () => void;
}

export default function WeatherCard({ data, onCancel }: Props) {
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    try {
      setLoading(true);
      await saveWeather(data);
      setSaved(true);
    } catch (error) {
      console.error("Save failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card p-3 mt-3">
      <h3>{data.city}</h3>

      <img
        src="https://img.freepik.com/free-vector/dynamic-weather-report-illustration_1308-180098.jpg"
        alt="weather"
        className="img-fluid rounded"
      />
      <p><i className="bi bi-thermometer-sun"></i> Temp: {data.temperature}°C</p>
      <p><i className="bi bi-moisture"></i> Humidity: {data.humidity}%</p>
      <p><i className="bi bi-wind"></i> Wind: {data.wind} m/s</p>
      <p>{data.description}</p>

      <div className="d-flex gap-2 mt-2">
        <button
          className="btn btn-success"
          onClick={handleSave}
          disabled={loading || saved}
        >
          {saved ? "Saved ✅" : loading ? "Saving..." : "Save"}
        </button>
        <button
          className="btn btn-secondary"
          onClick={onCancel}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}