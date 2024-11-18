import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { logout } from '../actions/auth-actions'
import { User } from '@supabase/supabase-js'
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { PawPrint, Users, FileText } from 'lucide-react'
import { Suspense } from 'react'

type UserInfoProps = {
    user: User | null
}

type DashboardStatsProps = {
    totalAnimals: number
    totalAdopters: number
    totalAdoptionRequests: number
}

const UserInfoSection = ({ user }: UserInfoProps) => (
  <main className="mb-12">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h2 className="text-l font-extrabold text-gray-900 mb-4">Welcome, {user?.email}</h2>
      <p className="text-l text-gray-600">You're now logged in to the dashboard.</p>
    </div>
  </main>
)

const DashboardSkeleton = () => (
  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
    {[...Array(3)].map((_, i) => (
      <Card key={i}>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <Skeleton className="h-4 w-[100px]" />
          <Skeleton className="h-4 w-4" />
        </CardHeader>
        <CardContent>
          <Skeleton className="h-8 w-[50px]" />
          <Skeleton className="h-4 w-[150px] mt-2" />
        </CardContent>
      </Card>
    ))}
  </div>
)

const DashboardStatsSection = ({ totalAnimals, totalAdopters, totalAdoptionRequests }: DashboardStatsProps) => {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Animals</CardTitle>
          <PawPrint className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalAnimals}</div>
          <p className="text-xs text-muted-foreground">Animals available for adoption</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Adopters</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalAdopters}</div>
          <p className="text-xs text-muted-foreground">Registered potential adopters</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Adoption Requests</CardTitle>
          <FileText className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalAdoptionRequests}</div>
          <p className="text-xs text-muted-foreground">Pending and processed requests</p>
        </CardContent>
      </Card>
    </div>
  )

}

export default async function Dashboard() {
    const supabase = await createClient()

    const { data, error } = await supabase.auth.getUser()

    const fetchCount = async (table: "adopters" | "adoption_requests" | "animals") => {
      const { count, error } = await supabase
        .from(table)
        .select('*', { count: 'exact', head: true })
  
      if (error) {
        console.error(`Error fetching ${table} count:`, error)
        return 0
      }
  
      return count || 0
    }

    const [animalCount, adopterCount, requestCount] = await Promise.all([
      fetchCount('animals'),
      fetchCount('adopters'),
      fetchCount('adoption_requests')
    ])


  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <h1 className="text-3xl font-bold">Home</h1>
      <Suspense fallback={<DashboardSkeleton />}>
        <UserInfoSection user={data?.user} />
        <DashboardStatsSection totalAnimals={animalCount} totalAdopters={adopterCount} totalAdoptionRequests={requestCount} />
      </Suspense>
    </div>
  )
}