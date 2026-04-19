import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface Props {
  onSearch: (city: string) => void;
  resetTrigger: boolean;
}

export default function SearchBar({ onSearch, resetTrigger }: Props) {
  const [city, setCity] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (resetTrigger) setCity("");
  }, [resetTrigger]);

  return (
    <div className="d-flex gap-2">
      <input
        className="form-control"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Enter city"
      />

      <button className="btn btn-primary" onClick={() => onSearch(city)}>
        Search
      </button>
      <button className="btn btn-secondary" onClick={() => navigate("/saved")}>
        View
      </button>
    </div>
  );
}
