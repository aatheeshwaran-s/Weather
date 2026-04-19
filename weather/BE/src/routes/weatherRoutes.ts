import { Router } from "express";
import {
  deleteWeather,
  fetchWeather,
  getSavedWeather,
  saveWeatherController,
} from "../controllers/weatherController";

const router = Router();

router.get("/", fetchWeather);
router.post("/save", saveWeatherController);
router.get("/saved", getSavedWeather);
router.delete("/:id", deleteWeather);

export default router;
