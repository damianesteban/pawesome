'use server'

import { supabase } from "@/utils/supabase/supabase";
import { revalidatePath } from "next/cache";

export async function getAdopters() {
    const { data: adopters, error } = await supabase.from("adopters").select("*");
    return adopters;
}

export async function getAnimals() {
    const { data: animals, error } = await supabase.from("animals").select("*");
    return animals;
}

export async function getAnimalById(id: number) {
    const { data: animal, error } = await supabase.from("animals").select("*").eq("id", id).single();
    return animal;
}

export async function getAdoptionRequests() {
    const { data: adoptionRequests, error } = await supabase.from("adoption_requests").select("*");
    return adoptionRequests;
}

export async function createAdoptionRequest(formData: FormData) {
    console.log('FORM DATA', formData)
    const animal_id = formData.get("animal_id") as string
    const user_id = formData.get("adopter_id") as string
    const notes = formData.get("notes") as string

    const res = await supabase
        .from('adoption_requests')
        .insert([{ animal_id: +animal_id, user_id: +user_id, notes }])

    revalidatePath('/dashboard/adoption-requests')
    return;

}