import { Router } from "express";
import { WeatherController } from "../controllers/weatherController.js";

export const createApiRoutes = (): Router => {
  const router = Router();
  const weatherController = new WeatherController();

  router.get("/weather", (req, res) => weatherController.getWeather(req, res));

  return router;
};
