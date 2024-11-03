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

const animals = [
  { id: 1, name: "Max", species: "Dog", breed: "Labrador", age: 3 },
  { id: 2, name: "Whiskers", species: "Cat", breed: "Siamese", age: 2 },
  { id: 3, name: "Hopper", species: "Rabbit", breed: "Dutch", age: 1 },
]

export default function AnimalsPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Animals</h1>
        <Button>Add Animal</Button>
      </div>
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <Table>
        <TableCaption>A list of animals available for adoption.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[200px]">Name</TableHead>
            <TableHead className="w-[300px]">Species</TableHead>
            <TableHead className="w-[200px]">Breed</TableHead>
            <TableHead className="w-[100px]">Age</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {animals.map((animal) => (
            <TableRow key={animal.id}>
              <TableCell>{animal.name}</TableCell>
              <TableCell>{animal.species}</TableCell>
              <TableCell>{animal.breed}</TableCell>
              <TableCell>{animal.age}</TableCell>
            </TableRow>
          ))}
        </TableBody>
        </Table>
      </div>
    </div>
  )
}