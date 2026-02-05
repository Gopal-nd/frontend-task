"use client"

import { useEffect, useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { MapPin } from "lucide-react"
import axios from "axios"

type CitySuggestion = {
  name: string
  country: string
  state?: string
  lat: number
  lon: number
}

type Props = {
  city: string
  setCity: (value: string) => void
  onSearch: () => void
}

export default function SearchBar({ city, setCity, onSearch }: Props) {
  const [suggestions, setSuggestions] = useState<CitySuggestion[]>([])
  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (!city.trim()) {
      setSuggestions([])
      return
    }

    const timeout = setTimeout(async () => {
      try {
        setLoading(true)
        const res = await axios.get(
          "https://api.openweathermap.org/geo/1.0/direct",
          {
            params: {
              q: city,
              limit: 5,
              appid: process.env.NEXT_PUBLIC_WEATHER_API_KEY,
            },
          }
        )
        setSuggestions(res.data)
        setOpen(true)
      } catch {
        setSuggestions([])
      } finally {
        setLoading(false)
      }
    }, 400)

    return () => clearTimeout(timeout)
  }, [city])

  return (
    <div className="relative w-full max-w-md">

      <div className="relative flex items-center">
        <MapPin className="absolute z-10 left-4 h-4 w-4 text-slate-800" />

        <Input
          value={city}
          placeholder="Search city…"
          onChange={(e) => setCity(e.target.value)}
          onFocus={() => city && setOpen(true)}
          onBlur={() => setTimeout(() => setOpen(false), 150)}
          className="
            pl-10 pr-28 py-6 rounded-full
            bg-white/70 backdrop-blur
            border border-slate-200
            shadow-sm
            focus-visible:ring-2 focus-visible:ring-blue-500
            transition
          "
        />

        <Button
          onClick={onSearch}
          className="absolute right-1 rounded-full px-5"
        >
          Search
        </Button>
      </div>

      {/* location suggestion based on the user input */}
      {open && suggestions.length > 0 && (
        <div className="absolute z-20 mt-2 w-full rounded-xl border bg-white shadow-lg overflow-hidden">
          {suggestions.map((c, idx) => (
            <button
              key={`${c.lat}-${c.lon}-${idx}`}
              onClick={() => {
                setCity(`${c.name}, ${c.country}`)
                setOpen(false)
                onSearch()
              }}
              className="w-full px-4 py-2 text-left text-sm hover:bg-slate-100 transition"
            >
              <span className="font-medium">{c.name}</span>
              <span className="text-muted-foreground">
                {c.state ? `, ${c.state}` : ""}, {c.country}
              </span>
            </button>
          ))}
        </div>
      )}

      {loading && (
        <p className="mt-2 text-xs text-muted-foreground text-center">
          Searching cities…
        </p>
      )}
    </div>
  )
}

