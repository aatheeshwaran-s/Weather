import { useEffect, useState } from "react";
import { getSavedWeather, deleteWeather } from "../services/api";
//import { SavedWeatherData }  from "../types/weather";
export default function Saved() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const res = await getSavedWeather();
      setData(res);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    //console.log("failed")
    fetchData();
  }, []);
  const handleDelete = async (id: string) => {
    try {
      await deleteWeather(id);
      setData((prev) => prev.filter((item) => item._id !== id));
    } catch (error) {
      console.error("Delete failed");
    }
  };

  if (loading) return <p className="text-center mt-5">Loading...</p>;

  return (
    <div className="container mt-5">
      <h2>Saved Cities</h2>

      {data.length === 0 && <p>No saved data</p>}

      {data.map((item) => (
        <div key={item._id} className="card p-3 mt-3">
          <h4>{item.city}</h4>
          <p>Temp: {item.temperature}°C</p>
          <p>Humidity: {item.humidity}%</p>
          <p>Wind: {item.wind} m/s</p>
          <p>{item.description}</p>

          <button
            className="btn btn-danger mt-2"
            onClick={() => handleDelete(item._id)}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}
