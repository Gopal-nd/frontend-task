import axios from "axios"

export async function reverseGeo(lat: number, lon: number) {
  const res = await axios.get(
    "https://api.openweathermap.org/geo/1.0/reverse",
    {
      params: {
        lat,
        lon,
        limit: 1,
        appid: process.env.NEXT_PUBLIC_WEATHER_API_KEY,
      },
    }
  )
  return res.data[0]?.name
}

