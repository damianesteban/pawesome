import { notFound } from 'next/navigation'
import Image from 'next/image'
import { getAnimalById } from '@/app/actions/data-actions'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default async function AnimalDetailPage({ params }: { params: { id: string } }) {
  const animal = await getAnimalById(+params.id)

//   if (error) {
//     console.error(error)
//     notFound()
//   }

  if (!animal) {
    notFound()
  }

  return (
    <div className="container mx-auto py-8">
      <Card className="w-full max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle className="text-3xl font-bold">{animal.name}</CardTitle>
          <CardDescription>{animal.species} - {animal.breed}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="relative w-full h-64 rounded-lg overflow-hidden flex justify-start">
            <Image
              src={animal.image_url || '/placeholder.svg'}
              alt={animal.name}
              fill
              style={{ objectFit: 'contain', objectPosition: 'left' }}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="font-semibold">Age</h3>
              <p>{animal.age} years old</p>
            </div>
            <div>
              <h3 className="font-semibold">Species</h3>
              <p>{animal.species}</p>
            </div>
            <div>
              <h3 className="font-semibold">Description</h3>
              <p>{animal.description}</p>
            </div>
            <div>
              <h3 className="font-semibold">Breed</h3>
              <p>{animal.breed}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}