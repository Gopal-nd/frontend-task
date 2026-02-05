"use client"

import { useState } from "react"
import SearchBar from "@/components/SearchBar"
import WeatherCard from "@/components/WeatherCard"
import WeatherSkeleton from "@/components/Loader"
import ErrorMessage from "@/components/ErrorMessage"
import { fetchWeather } from "@/lib/fetchWeather"
import { WeatherResponse } from "@/types/weather"

export default function Home() {
  const [city, setCity] = useState("")
  const [weather, setWeather] = useState<WeatherResponse | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")


  const handleSearch = async () => {
    if (!city.trim()) {
      setError("Enter a city name to see the current weather")
      return
    }

    setLoading(true)
    setError("")
    setWeather(null)

    try {
      const data = await fetchWeather(city)
      setWeather(data)
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

      <SearchBar city={city} setCity={setCity} onSearch={handleSearch} />

      {loading && <WeatherSkeleton />}
      {error && !loading && <ErrorMessage message={error} />}
      {weather && !loading && <WeatherCard data={weather} />}
    </main>
  )
}


