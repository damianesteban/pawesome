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

const adoptionRequests = [
  { id: 1, user: "John Doe", animal: "Max", status: "Pending" },
  { id: 2, user: "Jane Smith", animal: "Whiskers", status: "Approved" },
  { id: 3, user: "Bob Johnson", animal: "Hopper", status: "Under Review" },
]

export default function AdoptionRequestsPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Adoption Requests</h1>
        <Button>Add Request</Button>
      </div>
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <Table>
        <TableCaption>A list of adoption requests.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>User</TableHead>
            <TableHead className="w-[300px]">Animal</TableHead>
            <TableHead className="w-[200px]">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {adoptionRequests.map((request) => (
            <TableRow key={request.id}>
              <TableCell>{request.user}</TableCell>
              <TableCell>{request.animal}</TableCell>
              <TableCell>{request.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      </div>
    </div>
  )
}