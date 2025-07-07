import { redirect } from "next/navigation"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { SignOutButton } from "@/components/auth/signout-button"

export default async function DashboardPage() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect("/auth/signin")
  }

  return (
    <div className="container mx-auto py-8">
      <Card>
        <CardHeader>
          <CardTitle>Dashboard</CardTitle>
          <CardDescription>Welcome back, {session.user?.name}!</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p>Email: {session.user?.email}</p>
            <SignOutButton />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}