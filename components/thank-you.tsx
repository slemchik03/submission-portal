import { ArrowLeft } from "lucide-react"
import { Button } from "./ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./ui/card"
import Link from "next/link"
import { useMemo } from "react"

interface ThankYouProps {
  message: string
  submitedFields: Record<string, string>
}

export default function ThankYou({ message, submitedFields }: ThankYouProps) {
  const fields = useMemo(() => Object.entries(submitedFields), [submitedFields])
  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="text-3xl font-bold text-center text-primary">
          Thank You!
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-center text-muted-foreground">{message}</p>
        <div className="grid mt-2">
          {fields.map(([key, val]) => (
            <span key={key}>
              <b>{key}: </b>
              {val}
            </span>
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex justify-center">
        <Button asChild>
          <Link href="/" className="inline-flex items-center">
            <ArrowLeft className="mr-2 h-5 w-5" aria-hidden="true" />
            Back to Home
          </Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
