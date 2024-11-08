import { Suspense } from 'react'
import { getAnimals, getAdopters } from '@/app/actions/data-actions'
import AdoptionRequestForm from '@/components/ui/adoption-request-form'

async function AdoptionRequestFormWrapper() {
  const [animals, adopters] = await Promise.all([getAnimals(), getAdopters()]) 
  return <AdoptionRequestForm 
    animals={animals ?? []} 
    adopters={adopters ?? []}
  />
}

export default function CreateAdoptionRequestPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-semibold">Create Adoption Request</h1>
      <div className="bg-white shadow-md rounded-lg p-6">
        <Suspense fallback={<div>Loading form...</div>}>
          <AdoptionRequestFormWrapper />
        </Suspense>
      </div>
    </div>
  )
}