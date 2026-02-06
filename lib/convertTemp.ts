export function convertTemp(
  temp: number,
  unit: "metric" | "imperial"
) {
  if (unit === "imperial") {
    return Math.round((temp * 9) / 5 + 32)
  }
  return Math.round(temp)
}

