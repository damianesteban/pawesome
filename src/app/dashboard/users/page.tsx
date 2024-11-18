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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import { supabase } from "@/utils/supabase/supabase";
import Link from "next/link"

export default async function UsersPage() {
    const { data: adopters, error } = await supabase.from("adopters").select("*");


  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Adopters</h1>
        <Button>Add Adopter</Button>
      </div>
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <Table>
          <TableCaption>A list of adopters</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[200px]">First Name</TableHead>
              <TableHead className="w-[200px]">Last Name</TableHead>
              <TableHead className="w-[200px]">Email</TableHead>
              <TableHead className="w-[100px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {adopters?.map((user) => (
              <TableRow key={user.id}>
                <TableCell className="font-medium">{user.first_name}</TableCell>
                <TableCell>{user.last_name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <Link href={`/dashboard/users/${user.id}`} passHref>
                    <Button variant="outline" size="sm">View Details</Button>
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}