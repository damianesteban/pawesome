import { Dog, Home, Settings, Users } from "lucide-react"
import Link from "next/link"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableFooter,
} from "@/components/ui/table"


export default function Dashboard() {


  return (
    <div className="flex h-[calc(100vh-64px)] bg-gray-100">
      {/* Sidebar - Always visible */}
      <aside className="bg-white w-64 min-h-full p-4">
        <nav>
          <Link
            href="#"
            className="block py-2 px-4 text-gray-700 hover:bg-gray-200 rounded"
          >
            <Home className="inline-block mr-2" size={20} />
            Dashboard
          </Link>
          <Link
            href="#"
            className="block py-2 px-4 text-gray-700 hover:bg-gray-200 rounded"
          >
            <Dog className="inline-block mr-2" size={20} />
            Animals
          </Link>
          <Link
            href="#"
            className="block py-2 px-4 text-gray-700 hover:bg-gray-200 rounded"
          >
            <Users className="inline-block mr-2" size={20} />
            Volunteers
          </Link>
          <Link
            href="#"
            className="block py-2 px-4 text-gray-700 hover:bg-gray-200 rounded"
          >
            <Settings className="inline-block mr-2" size={20} />
            Settings
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-6">
        <h1 className="text-3xl font-semibold text-gray-800 mb-6">Dashboard</h1>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>Total Animals</CardTitle>
              <CardDescription>Current number of rescued animals</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">42</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Adoptions This Month</CardTitle>
              <CardDescription>Number of successful adoptions</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">12</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Active Volunteers</CardTitle>
              <CardDescription>Number of volunteers this week</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">28</p>
            </CardContent>
          </Card>
        </div>
      </div>
      <Table>
      <TableCaption>Our Rescues</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Species</TableHead>
          <TableHead className="text-right">Breed</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data?.map((rescue) => (
          <TableRow key={rescue.id}>
            <TableCell>{rescue.name}</TableCell>
            <TableCell>{rescue.animalType}</TableCell>
            <TableCell>{rescue.breed}</TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
      </TableFooter>
    </Table>
    </div>
  )
}