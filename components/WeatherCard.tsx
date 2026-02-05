import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { WeatherResponse } from "@/types/weather"
import InfoTooltip from "@/components/InfoTooltip"

type Props = {
  data: WeatherResponse
}

export default function WeatherCard({ data }: Props) {
  return (
    <Card className="w-full max-w-md mt-6 text-center">
      <CardHeader>
        <CardTitle className="text-2xl flex items-center justify-center gap-1">
          {data.name}
          <InfoTooltip text="City name for which the weather data is shown" />
        </CardTitle>
      </CardHeader>

      <CardContent>
        <div className="flex items-center justify-center gap-1">
          <p className="text-5xl font-bold">
            {Math.round(data.main.temp)}°C
          </p>
          <InfoTooltip text="Current temperature measured in Celsius" />
        </div>

        <div className="flex items-center justify-center gap-1 mt-2 text-muted-foreground capitalize">
          {data.weather[0].description}
          <InfoTooltip text="Current weather condition such as clear, cloudy, or rain" />
        </div>

        <div className="grid grid-cols-2 gap-4 mt-6 text-sm">
          <div className="rounded-lg bg-muted p-3">
            <div className="flex items-center justify-center gap-1">
              Humidity
              <InfoTooltip text="Percentage of moisture present in the air" />
            </div>
            <p className="font-semibold">{data.main.humidity}%</p>
          </div>

          <div className="rounded-lg bg-muted p-3">
            <div className="flex items-center justify-center gap-1">
              Wind
              <InfoTooltip text="Current wind speed measured in meters per second" />
            </div>
            <p className="font-semibold">{data.wind.speed} m/s</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

