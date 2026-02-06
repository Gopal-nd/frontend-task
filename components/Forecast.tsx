import { Card } from "@/components/ui/card"
import { convertTemp } from "@/lib/convertTemp"

type Props = {
  data: any[]
  unit: "metric" | "imperial"
}

export default function Forecast({ data, unit }: Props) {
  return (
    <div className="mt-6 w-full max-w-3xl">
      <h3 className="mb-3 text-lg font-semibold text-slate-800">
        5-Day Forecast
      </h3>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
        {data.map((day, index) => (
          <Card
            key={index}
            className="p-3 text-center bg-white/70 backdrop-blur"
          >
            <p className="text-sm font-medium">
              {new Date(day.dt_txt).toLocaleDateString(undefined, {
                weekday: "short",
              })}
            </p>

            <p className="text-2xl font-bold my-2">
              {convertTemp(day.main.temp, unit)}°
              {unit === "metric" ? "C" : "F"}
            </p>

            <p className="text-xs capitalize text-muted-foreground">
              {day.weather[0].description}
            </p>
          </Card>
        ))}
      </div>
    </div>
  )
}

