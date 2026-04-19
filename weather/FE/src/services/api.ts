import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});
export const fetchWeather = async (city: string) => {
  try {
    const response = await API.get(`/weather?city=${city}`);
    return response.data;
  } catch (error: any) {
    throw error.response?.data?.message || "Failed to fetch weather";
  }
};
export const saveWeather = async (data: any) => {
  try {
    const response = await API.post("/weather/save", data);
    return response.data;
  } catch (error: any) {
    throw error.response?.data?.message || "Failed to save weather";
  }
};
export const getSavedWeather = async () => {
  try {
    const response = await API.get("/weather/saved");
    return response.data;
  } catch (error: any) {
    throw error.response?.data?.message || "Failed to fetch saved data";
  }
};
export const deleteWeather = async (id: string) => {
  try {
    const response = await API.delete(`/weather/${id}`);
    return response.data;
  } catch (error: any) {
    throw error.response?.data?.message || "Failed to delete weather";
  }
};