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
  onSearch: (value?: string) => void
}

export default function SearchBar({ city, setCity, onSearch }: Props) {
  const [suggestions, setSuggestions] = useState<CitySuggestion[]>([])
  const [open, setOpen] = useState(false)
  const [isUserTyping, setIsUserTyping] = useState(false)

  useEffect(() => {
    if (!city.trim()) {
      setSuggestions([])
      return
    }

    const timeout = setTimeout(async () => {
      try {
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
      }
    }, 400)

    return () => clearTimeout(timeout)
  }, [city])

  const handleSuggestionSelect = (c: CitySuggestion) => {
    const selectedCity = `${c.name}, ${c.country}`

    setCity(selectedCity)

    setIsUserTyping(false)
    setOpen(false)
    setSuggestions([])

    onSearch(selectedCity)
  }

  return (
    <div className="relative w-full max-w-md">
      {/* Input */}
      <div className="relative flex items-center">
        <MapPin className="absolute left-4 h-4 w-4 text-slate-400 z-10" />

        <Input
          value={city}
          placeholder="Search city…"
          onChange={(e) => {
            setIsUserTyping(true)
            setCity(e.target.value)
          }}
          onFocus={() => {
            if (isUserTyping && suggestions.length > 0) {
              setOpen(true)
            }
          }}
          onBlur={() => {
            setTimeout(() => {
              setOpen(false)
              setIsUserTyping(false)
            }, 150)
          }}
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
          onClick={() => {
            setIsUserTyping(false)
            setOpen(false)
            setSuggestions([])
            onSearch()
          }}
          className="absolute right-1 rounded-full px-5"
        >
          Search
        </Button>
      </div>

      {/* Suggestions Dropdown */}
      {open && isUserTyping && suggestions.length > 0 && (
        <div className="absolute z-30 mt-2 w-full rounded-xl border bg-white shadow-lg overflow-hidden">
          {suggestions.map((c, idx) => (
            <button
              key={`${c.lat}-${c.lon}-${idx}`}
              onMouseDown={(e) => {
                e.preventDefault()
                handleSuggestionSelect(c)
              }}
              onClick={() => handleSuggestionSelect(c)}
              className="w-full px-4 py-2 z-50 text-left text-sm hover:bg-slate-100 transition"
            >
              <span className="font-medium">{c.name}</span>
              <span className="text-muted-foreground">
                {c.state ? `, ${c.state}` : ""}, {c.country}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

