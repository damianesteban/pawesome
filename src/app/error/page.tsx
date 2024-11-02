import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

export default function ErrorPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Authentication Error</CardTitle>
          <CardDescription>There was an error during authentication.</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-center">
            Please try again or contact support if the problem persists.
          </p>
          <div className="mt-4 text-center">
            <Link href="/login" className="text-blue-600 hover:underline">
              Back to Login
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}