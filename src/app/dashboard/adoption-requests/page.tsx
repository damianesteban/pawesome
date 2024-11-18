import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { supabase } from "@/utils/supabase/supabase";
import Link from "next/link";
import { useRouter } from "next/router";
import { Suspense } from "react";

async function AdoptionRequestList() {

  const { data: adoptionRequests, error } = await supabase.from("adoption_requests").select(`
      id,
      user_id,
      animal_id,
      status,
      notes,
      user:adopters(
          id,
          first_name,
          last_name
      ),
      animal:animals(
          id,
          name
      )
  `).order('created_at', { ascending: false })

    if (error) {
      return <div className="text-red-500">Error loading adoption requests: {error.message}</div>
    }
  
    if (!adoptionRequests || adoptionRequests.length === 0) {
      return <div className="text-center py-4">No adoption requests found.</div>
    }

    return (
        <Table>
        <TableCaption>A list of adoption requests.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[200px]">Pet Name</TableHead>
            <TableHead className="w-[300px]">Adopter Name</TableHead>
            <TableHead className="w-[200px]">Status</TableHead>
            <TableHead className="w-[300px]">Notes</TableHead>
            <TableHead className="w-[100px]">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>

          {adoptionRequests?.map((request) => (
            <TableRow key={request.id}>
              <TableCell>{request.animal?.name}</TableCell>
              <TableCell>{request.user?.first_name} {request.user?.last_name}</TableCell>
              <TableCell>{request.status}</TableCell>
              <TableCell>{request.notes}</TableCell>
              <TableCell>
                <Link href={`/dashboard/adoption-requests/${request.id}`} passHref>
                  <Button variant="outline" size="sm">View Details</Button>
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    )


}
export default async function AdoptionRequestsPage() {
   
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Adoption Requests</h1>
        <Link href="/dashboard/adoption-requests/create">
          <Button>Add Request</Button>
        </Link>
      </div>
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <Suspense fallback={<div>Loading...</div>}>
          <AdoptionRequestList />
        </Suspense>
      </div>
    </div>
  )
}