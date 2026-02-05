import { Skeleton } from "@/components/ui/skeleton"

export default function WeatherSkeleton() {
  return (
    <div className="w-full max-w-md mt-6 space-y-4">
      <Skeleton className="h-8 w-1/2 mx-auto" />
      <Skeleton className="h-16 w-1/3 mx-auto" />
      <Skeleton className="h-4 w-1/2 mx-auto" />

      <div className="grid grid-cols-2 gap-4 mt-6">
        <Skeleton className="h-20 w-full rounded-lg" />
        <Skeleton className="h-20 w-full rounded-lg" />
      </div>
    </div>
  )
}

