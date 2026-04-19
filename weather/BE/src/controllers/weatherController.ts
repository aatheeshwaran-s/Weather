import { NextFunction, Request, Response } from "express";
import {
  deleteWeatherService,
  fetchWeatherByCityService,
  getSavedWeatherService,
  saveWeatherService,
} from "../services";

export const fetchWeather = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const queryCity = req.query.city;
    const city = (() => {
      if (typeof queryCity === "string") {
        return queryCity;
      }

      if (Array.isArray(queryCity) && typeof queryCity[0] === "string") {
        return queryCity[0];
      }

      return undefined;
    })();
    const response = await fetchWeatherByCityService(city);
    res.status(response.statusCode).json(response);
  } catch (error) {
    next(error);
  }
};
export const saveWeatherController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const response = await saveWeatherService(req.body);
    res.status(response.statusCode).json(response);
  } catch (error) {
    next(error);
  }
};

export const getSavedWeather = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const response = await getSavedWeatherService();
    res.status(response.statusCode).json(response);
  } catch (error) {
    next(error);
  }
};

export const deleteWeather = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const paramId = req.params.id;
    const weatherId =
      typeof paramId === "string"
        ? paramId
        : Array.isArray(paramId)
          ? paramId[0] ?? ""
          : "";
    const response = await deleteWeatherService(weatherId);
    res.status(response.statusCode).json(response);
  } catch (error) {
    next(error);
  }
};
