import React, { useState, useEffect } from "react";
import axios from "axios";

const Weather = () => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:9453";
        const response = await axios.get(`${apiUrl}/api/weather`);
        setWeather(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch weather data");
        setLoading(false);
      }
    };

    fetchWeather();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-400 to-blue-600">
        <div className="text-white text-2xl">Loading weather data...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-400 to-red-600">
        <div className="text-white text-2xl">{error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-400 to-blue-600">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full mx-4">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Hong Kong Weather
        </h1>

        <div className="space-y-4">
          <div className="flex justify-between items-center p-4 bg-blue-50 rounded-lg">
            <span className="text-gray-600 font-medium">Temperature</span>
            <span className="text-2xl font-bold text-blue-600">
              {weather?.data?.temperature}°C
            </span>
          </div>

          <div className="flex justify-between items-center p-4 bg-green-50 rounded-lg">
            <span className="text-gray-600 font-medium">Humidity</span>
            <span className="text-2xl font-bold text-green-600">
              {weather?.data?.humidity}%
            </span>
          </div>

          <div className="flex justify-between items-center p-4 bg-purple-50 rounded-lg">
            <span className="text-gray-600 font-medium">Condition</span>
            <span className="text-2xl font-bold text-purple-600">
              {weather?.data?.condition}
            </span>
          </div>

          <div className="flex justify-between items-center p-4 bg-orange-50 rounded-lg">
            <span className="text-gray-600 font-medium">Wind Speed</span>
            <span className="text-2xl font-bold text-orange-600">
              {weather?.data?.windSpeed} km/h
            </span>
          </div>

          <div className="text-center text-gray-500 text-sm mt-6">
            Last updated: {new Date(weather?.data?.timestamp).toLocaleString()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Weather;
