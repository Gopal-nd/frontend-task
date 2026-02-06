"use client"

import { useEffect, useState } from "react"
import SearchBar from "@/components/SearchBar"
import WeatherCard from "@/components/WeatherCard"
import WeatherSkeleton from "@/components/Loader"
import ErrorMessage from "@/components/ErrorMessage"
import { fetchWeather } from "@/lib/fetchWeather"
import { WeatherResponse } from "@/types/weather"
import { fetchForecast } from "@/lib/fetchForecast"
import { reverseGeo } from "@/lib/reverseGeo"
import UnitToggle from "@/components/UnitToggle"
import Forecast from "@/components/Forecast"

export default function Home() {
  const [city, setCity] = useState("")
  const [weather, setWeather] = useState<WeatherResponse | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [unit, setUnit] = useState<"metric" | "imperial">("metric")
  const [forecast, setForecast] = useState<any[]>([])




  useEffect(() => {
    navigator.geolocation?.getCurrentPosition(async (pos) => {
      const cityName = await reverseGeo(
        pos.coords.latitude,
        pos.coords.longitude
      )

      if (cityName) {
        setCity(cityName.split(' ')[0])
        setLoading(true)

        const weatherData = await fetchWeather(cityName)
        const forecastData = await fetchForecast(cityName)

        setWeather(weatherData)
        setForecast(forecastData)
        setLoading(false)
      }
    })
  }, [])




  const handleSearch = async (searchCity?: string) => {
    const cityToSearch = searchCity ?? city

    if (!cityToSearch.trim()) {
      setError("Enter a city name to see the current weather")
      return
    }

    try {
      setLoading(true)
      setError("")

      const weatherData = await fetchWeather(cityToSearch)
      const forecastData = await fetchForecast(cityToSearch)

      setWeather(weatherData)
      setForecast(forecastData)
    } catch (err: any) {
      setError(
        err.message === "City not found"
          ? "We couldn’t find that city. Please check the spelling and try again."
          : "We’re having trouble fetching the weather right now. Please try again shortly."
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <main
      className={`
        min-h-screen flex flex-col items-center justify-center p-6
        relative bg-[radial-gradient(125%_100%_at_50%_0%,_#FFF_6.32%,_#E0F0FF_29.28%,_#E7EFFD_68.68%,_#FFF_100%)] 
        transition-all duration-700 ease-in-out
      `}
    >
      <h1 className="text-4xl font-bold mb-6 text-slate-900">
        Weather App
      </h1>
      <UnitToggle unit={unit} onChange={setUnit} />

      <SearchBar city={city} setCity={setCity} onSearch={handleSearch} />

      {loading && <WeatherSkeleton />}
      {error && !loading && <ErrorMessage message={error} />}
      {weather && !loading && (
        <>
          <WeatherCard data={weather} unit={unit} />
          <Forecast data={forecast} unit={unit} />
        </>
      )}    </main>
  )
}

