import axios from "axios"

export async function fetchForecast(
  city: string,
) {
  const res = await axios.get(
    "https://api.openweathermap.org/data/2.5/forecast",
    {
      params: {
        q: city,
        units: 'metric',
        appid: process.env.NEXT_PUBLIC_WEATHER_API_KEY,
      },
    }
  )


  return res.data.list.filter((_: any, index: number) => index % 8 === 0)
}

