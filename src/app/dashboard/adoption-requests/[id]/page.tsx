import { notFound } from 'next/navigation'
import { getAdoptionRequest, updateAddoptionRequest } from '@/app/actions/data-actions'
import AdoptionRequestForm from '@/components/ui/adoption-request-update-form'

export default async function AdoptionRequestDetailPage({ params }: { params: { id: string } }) {


    const id = await params
  const data  = await getAdoptionRequest(+params.id)

  if (!data) {
    notFound()  
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Adoption Request Details</h1>
      <AdoptionRequestForm request={data} updateAction={updateAddoptionRequest} />
    </div>
  )
}