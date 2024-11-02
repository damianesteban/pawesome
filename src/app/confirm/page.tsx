import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function ConfirmPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Check Your Email</CardTitle>
          <CardDescription>We've sent you a confirmation link.</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-center">
            Please check your email and click on the link to confirm your account.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}