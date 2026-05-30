import type { Request, Response } from "express";
import { WeatherService } from "../services/weatherService.js";

export class WeatherController {
  private weatherService: WeatherService;

  constructor() {
    this.weatherService = new WeatherService();
  }

  async getWeather(req: Request, res: Response): Promise<void> {
    try {
      const weatherData = await this.weatherService.getHKWeather();
      res.json(weatherData);
    } catch (error) {
      res.status(500).json({
        error: "Failed to fetch weather data",
        message: error instanceof Error ? error.message : String(error),
      });
    }
  }
}
