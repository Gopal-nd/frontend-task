import axios from "axios"
import { WeatherResponse } from "@/types/weather"

const BASE_URL = "https://api.openweathermap.org/data/2.5/weather"

export async function fetchWeather(city: string): Promise<WeatherResponse> {
  try {
    const res = await axios.get<WeatherResponse>(BASE_URL, {
      params: {
        q: city,
        units: "metric",
        appid: process.env.NEXT_PUBLIC_WEATHER_API_KEY,
      },
    })

    return res.data
  } catch (error: any) {
    console.log(error)
    if (error.response?.status === 404) {
      throw new Error("City not found")
    }
    throw new Error("Unable to fetch weather data")
  }
}

