'use server'

import { supabase } from "@/utils/supabase/supabase";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

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
    const { data: adoptionRequests, error: adoptionRequestsError } = await supabase.from("adoption_requests").select(`
        id,
        user_id,
        animal_id,
        status,
        notes,
        created_at,
        user:adopters(
            id,
            first_name,
            last_name
        )
    `).eq("animal_id", id);
    return { animal, adoptionRequests };
}

export async function getAdoptionRequests() {
    const { data: adoptionRequests, error } = await supabase.from("adoption_requests").select("*");
    return adoptionRequests;
}

export async function getAdoptionRequest(id: number) {
    const { data: adoptionRequest, error } = await supabase.from("adoption_requests").select(`
        id,
        user_id,
        animal_id,
        status,
        notes,
        created_at,
        user:adopters(
            id,
            first_name,
            last_name
        ),
        animal:animals(
            id,
            name,
            image_url
        )   
    `).eq("id", id).single();
    return adoptionRequest;
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

export async function updateAddoptionRequest(formData: FormData): Promise<{ success: boolean, error?: string}> {
    const id = formData.get("id") as string;
    const status = formData.get("status") as any;
    const notes = formData.get("notes") as string;

    const {
         error
    } = await supabase
            .from("adoption_requests")
            .update({ status, notes })
            .eq("id", id);


    if (error) return { success: false, error: error.message }

    revalidatePath(`/dashboard/adoption-requests/${id}`)

    return { success: true }

}