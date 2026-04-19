import mongoose from "mongoose";

const weatherSchema = new mongoose.Schema(
  {
    city: { type: String, required: true },
    temperature: Number,
    humidity: Number,
    wind: Number,
    description: String,
  },
  { timestamps: true }
);

export const WeatherModel = mongoose.model("Weather", weatherSchema);