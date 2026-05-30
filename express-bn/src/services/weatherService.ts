import https from "https";
import type { HKWeatherData } from "../types/index.js";

const WEATHER_URL =
  "https://data.weather.gov.hk/weatherAPI/opendata/weather.php?dataType=rhrread&lang=en";

export class WeatherService {
  private getWeatherCondition(icon: number): string {
    // HKO icon mapping (simplified - actual mapping may need more icons)
    const iconMap: Record<number, string> = {
      50: "Sunny",
      51: "Sunny",
      52: "Partly Cloudy",
      53: "Partly Cloudy",
      54: "Cloudy",
      55: "Cloudy",
      60: "Rainy",
      61: "Rainy",
      62: "Heavy Rain",
      63: "Heavy Rain",
      64: "Thunderstorm",
      65: "Thunderstorm",
      70: "Windy",
      71: "Windy",
      72: "Windy",
      73: "Windy",
      74: "Windy",
      75: "Windy",
      76: "Cloudy",
      77: "Cloudy",
      78: "Cloudy",
      79: "Cloudy",
      80: "Cloudy",
      81: "Cloudy",
      82: "Cloudy",
      83: "Cloudy",
      84: "Cloudy",
      85: "Cloudy",
      86: "Cloudy",
      87: "Cloudy",
      88: "Cloudy",
      89: "Cloudy",
      90: "Cloudy",
    };
    return iconMap[icon] || "Unknown";
  }

  async getHKWeather(): Promise<HKWeatherData> {
    return new Promise((resolve, reject) => {
      const url = WEATHER_URL;

      https
        .get(url, (res) => {
          let data = "";

          res.on("data", (chunk) => {
            data += chunk;
          });

          res.on("end", () => {
            try {
              if (!data || data.trim() === "") {
                reject(new Error("Empty response from HKO API"));
                return;
              }

              const parsed = JSON.parse(data);

              // Navigate through the HKO response structure
              let temp = 0,
                humidity = 0,
                windSpeed = 0,
                condition = "Unknown";

              // Extract temperature from HKO response
              if (
                parsed.temperature?.data &&
                Array.isArray(parsed.temperature.data)
              ) {
                const hkoTemp = parsed.temperature.data.find(
                  (item: any) => item.place === "Hong Kong Observatory",
                );
                if (hkoTemp?.value) {
                  temp = hkoTemp.value;
                }
              }

              // Extract humidity from HKO response
              if (
                parsed.humidity?.data &&
                Array.isArray(parsed.humidity.data)
              ) {
                const hkoHumidity = parsed.humidity.data[0];
                if (hkoHumidity?.value) {
                  humidity = hkoHumidity.value;
                }
              }

              // Extract weather condition from icon
              if (
                parsed.icon &&
                Array.isArray(parsed.icon) &&
                parsed.icon.length > 0
              ) {
                const icon = parsed.icon[0];
                condition = this.getWeatherCondition(icon);
              }

              if (temp === 0 && humidity === 0) {
                reject(
                  new Error(
                    "Unable to extract temperature data from HKO response",
                  ),
                );
                return;
              }

              resolve({
                success: true,
                data: {
                  temperature: temp,
                  humidity: humidity,
                  windSpeed: windSpeed,
                  condition: condition,
                  timestamp: new Date().toISOString(),
                },
              });
            } catch (error) {
              console.error("Parse error details:", error);
              reject(new Error("Failed to parse weather data"));
            }
          });
        })
        .on("error", (error) => {
          reject(error);
        });
    });
  }
}
