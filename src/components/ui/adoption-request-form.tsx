'use client'

import { useReducer, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createAdoptionRequest } from '@/app/actions/data-actions'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"

type FormProps = {
  animals: any[]
  adopters: any[]
}

// Define the initial state
const initialState = {
  selectedAnimal: null,
  selectedAdopter: null,
};

// Define the reducer function
function reducer(state: typeof initialState, action: { type: string; payload: any }) {
  switch (action.type) {
    case 'SET_ANIMAL':
      return { ...state, selectedAnimal: action.payload };
    case 'SET_ADOPTER':
      return { ...state, selectedAdopter: action.payload };
    default:
      return state;
  }
}

export default function AdoptionRequestForm({ animals, adopters }: FormProps) {
  const [state, dispatch] = useReducer(reducer, initialState)
  const router = useRouter()
  const { toast } = useToast()

  const handleAnimalChange = (value: string) => {
    dispatch({ type: 'SET_ANIMAL', payload: value })
  }

  const handleAdopterChange = (value: string) => {
    dispatch({ type: 'SET_ADOPTER', payload: value })
  }

  // Retrieve selected animal and adopter details
  const selectedAnimal = animals.find((a) => a.id === state.selectedAnimal);
  const selectedAdopter = adopters.find((a) => a.id === state.selectedAdopter);

  useEffect(() => {
    const selectedAnimal = animals.find((a) => a.id === state.selectedAnimal);
    if (selectedAnimal) {
      console.log('Selected Animal:', selectedAnimal);
    }
  }, [state.selectedAnimal]);
  
  useEffect(() => {
    const selectedAdopter = adopters.find((a) => a.id === state.selectedAdopter);
    if (selectedAdopter) {
      console.log('Selected Adopter:', selectedAdopter);
    }
  }, [state.selectedAdopter]);

  async function handleSubmit(formData: FormData) {
    try {
      await createAdoptionRequest(formData)
      toast({
        title: "Success",
        description: "Adoption request created successfully",
      })
      router.push('/dashboard/adoption-requests')
    } catch (e) {
      toast({
        title: "Error",
        description: e,
        variant: "destructive",
      })
    }
  }

  return (
    <form action={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="animal">Animal</Label>
        <Select name="animal_id" value={state.selectedAnimal} onValueChange={handleAnimalChange}>
          <SelectTrigger>
            <SelectValue>
              {selectedAnimal ? selectedAnimal.name : "Select an animal"}
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            {animals.map((animal) => (
              <SelectItem key={animal.id} value={animal.id}>{animal.name}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Input
          type="hidden"
          name="animal_name"
          value={selectedAnimal?.name || ''}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="adopter">Adopter</Label>
        <Select name="adopter_id" value={state.selectedAdopter} onValueChange={handleAdopterChange}>
          <SelectTrigger>
            <SelectValue>
              {selectedAdopter ? `${selectedAdopter.first_name} ${selectedAdopter.last_name}` : "Select an adopter"}
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            {adopters.map((adopter) => (
              <SelectItem key={adopter.id} value={adopter.id}>{adopter.first_name} {adopter.last_name}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Input
          type="hidden"
          name="adopter_name"
          value={selectedAdopter ? `${selectedAdopter.first_name} ${selectedAdopter.last_name}` : ''}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="notes">Notes (Optional)</Label>
        <Textarea id="notes" name="notes" placeholder="Enter any additional notes here" />
      </div>

      <Button type="submit">Create Adoption Request</Button>
    </form>
  )
}