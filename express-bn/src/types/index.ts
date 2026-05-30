export interface HKWeatherData {
  success: boolean;
  data: {
    temperature: number;
    humidity: number;
    windSpeed: number;
    condition: string;
    timestamp: string;
  };
}
