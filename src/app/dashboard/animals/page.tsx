import Link from 'next/link'
import { Suspense } from 'react'
import { supabase } from "@/utils/supabase/supabase";
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

async function AnimalList() {
  const { data: animals, error } = await supabase
    .from('animals')
    .select('*')
    .order('name', { ascending: true })

  if (error) {
    return <div className="text-red-500">Error loading animals: {error.message}</div>
  }

  if (!animals || animals.length === 0) {
    return <div className="text-center py-4">No animals found.</div>
  }

  return (
    <Table>
      <TableCaption>A list of animals available for adoption.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Species</TableHead>
          <TableHead>Breed</TableHead>
          <TableHead>Age</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {animals.map((animal) => (
          <TableRow key={animal.id}>
            <TableCell className="font-medium">{animal.name}</TableCell>
            <TableCell>{animal.species}</TableCell>
            <TableCell>{animal.breed}</TableCell>
            <TableCell>{animal.age} years</TableCell>
            <TableCell>
              <Link href={`/dashboard/animals/${animal.id}`} passHref>
                <Button variant="outline" size="sm">View Details</Button>
              </Link>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

export default function AnimalsPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-semibold">Animals</h1>
        <Link href="/dashboard/animals/create" passHref>
          <Button>Add New Animal</Button>
        </Link>
      </div>
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <Suspense fallback={<div className="p-4 text-center">Loading animals...</div>}>
          <AnimalList />
        </Suspense>
      </div>
    </div>
  )
}