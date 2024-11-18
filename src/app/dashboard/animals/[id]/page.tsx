import { notFound } from 'next/navigation'
import Image from 'next/image'
import { getAnimalById } from '@/app/actions/data-actions'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableRow, TableHead, TableCaption, TableHeader, TableCell } from '@/components/ui/table'

export default async function AnimalDetailPage({ params }: { params: { id: string } }) {
  const data = await getAnimalById(+params.id)

  if (!data) {
    notFound()
  }

  return (
    <div className="container mx-auto py-8 space-y-8">
      <Card className="w-full max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle className="text-3xl font-bold">{data.animal?.name}</CardTitle>
          <CardDescription>{data.animal?.species} - {data.animal?.breed}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="relative w-full h-64 rounded-lg overflow-hidden flex justify-start">
            <Image
              src={data.animal?.image_url || '/placeholder.svg'}
              alt={data.animal?.name || ''}
              fill
              style={{ objectFit: 'contain', objectPosition: 'left' }}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="font-semibold">Age</h3>
              <p>{data.animal?.age} years old</p>
            </div>
            <div>
              <h3 className="font-semibold">Species</h3>
              <p>{data.animal?.species}</p>
            </div>
            <div>
              <h3 className="font-semibold">Description</h3>
              <p>{data.animal?.description}</p>
            </div>
            <div>
              <h3 className="font-semibold">Breed</h3>
              <p>{data.animal?.breed}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="w-full max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Adoption Requests</CardTitle>
        </CardHeader>
        <CardContent>
          {data?.adoptionRequests?.length !== 0 ? (
            <Table>
              <TableCaption>A list of adoption requests for {data.animal?.name}</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>Adopter</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data?.adoptionRequests?.map((request) => (
                  <TableRow key={request.id}>
                        <TableCell className="font-medium">{request?.user?.first_name} {request?.user?.last_name}</TableCell>
                    <TableCell>{request.status}</TableCell>
                    <TableCell>{new Date(request.created_at).toLocaleDateString()}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <p>No adoption requests for this animal yet.</p>
          )}
        </CardContent>
      </Card>
    </div>
  )
}