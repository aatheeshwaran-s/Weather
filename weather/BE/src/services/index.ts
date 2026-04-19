import axios from "axios";
import { WeatherModel } from "../models/Weather";

type ServiceResponse<T> = {
  statusCode: number;
  message: string;
  data: T;
};

type WeatherPayload = {
  city?: string;
  temperature?: number | null;
  humidity?: number | null;
  wind?: number | null;
  description?: string | null;
  icon?: string | null;
};

const createResponse = <T>(
  statusCode: number,
  message: string,
  data: T
): ServiceResponse<T> => ({
  statusCode,
  message,
  data,
});

export const fetchWeatherByCityService = async (
  city?: string
): Promise<ServiceResponse<WeatherPayload>> => {
  if (!city?.trim()) {
    return createResponse(400, "City is required", {});
  }

  try {
    const response = await axios.get(
      "https://api.openweathermap.org/data/2.5/weather",
      {
        params: {
          q: city.trim(),
          appid: process.env.WEATHER_API_KEY,
          units: "metric",
        },
      }
    );

    return createResponse(200, "Weather fetched successfully", {
      city: response.data.name,
      temperature: response.data.main.temp,
      humidity: response.data.main.humidity,
      wind: response.data.wind.speed,
      description: response.data.weather[0].description,
      icon: response.data.weather[0].icon,
    });
  } catch (error: any) {
    if (error.response?.status === 404) {
      return createResponse(404, "City not found", {});
    }

    return createResponse(500, "Failed to fetch weather", {});
  }
};

export const saveWeatherService = async (
  payload: WeatherPayload
): Promise<ServiceResponse<Record<string, unknown>>> => {
  const savedWeather = await WeatherModel.create(payload);

  return createResponse(201, "Weather saved successfully", savedWeather.toObject());
};

export const getSavedWeatherService = async (): Promise<
  ServiceResponse<Record<string, unknown>[]>
> => {
  const savedWeather = await WeatherModel.find().sort({ createdAt: -1 }).lean();

  return createResponse(200, "Saved weather fetched successfully", savedWeather);
};

export const deleteWeatherService = async (
  id: string
): Promise<ServiceResponse<null>> => {
  const deletedWeather = await WeatherModel.findByIdAndDelete(id);

  if (!deletedWeather) {
    return createResponse(404, "Weather record not found", null);
  }

  return createResponse(200, "Weather deleted successfully", null);
};
