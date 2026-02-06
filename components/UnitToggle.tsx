import { Button } from "@/components/ui/button"

type Props = {
  unit: "metric" | "imperial"
  onChange: (u: "metric" | "imperial") => void
}

export default function UnitToggle({ unit, onChange }: Props) {
  return (
    <div className="flex gap-2 mb-4">
      <Button
        variant={unit === "metric" ? "default" : "outline"}
        onClick={() => onChange("metric")}
      >
        °C
      </Button>
      <Button
        variant={unit === "imperial" ? "default" : "outline"}
        onClick={() => onChange("imperial")}
      >
        °F
      </Button>
    </div>
  )
}

