import { Alert, AlertDescription } from "@/components/ui/alert"

type Props = {
  message: string
}

export default function ErrorMessage({ message }: Props) {
  return (
    <Alert
      variant="destructive"
      className="mt-4 w-full max-w-md"
    >
      <AlertDescription>{message}</AlertDescription>
    </Alert>
  )
}

