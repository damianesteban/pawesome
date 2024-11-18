import { createClient } from "@/utils/supabase/server";
import { createServerClient } from "@supabase/ssr";

const animals = [
    {
      name: "Bella",
      breed: "Labrador Retriever",
      age: 3,
      status: "Available",
    },
    {
      name: "Max",
      breed: "German Shepherd",
      age: 5,
      status: "Adopted",
    },
    {
      name: "Luna",
      breed: "Persian Cat",
      age: 2,
      status: "Available",
    },
    {
      name: "Charlie",
      breed: "Siamese Cat",
      age: 4,
      status: "Fostered",
    },
    {
      name: "Molly",
      breed: "Golden Retriever",
      age: 6,
      status: "Available",
    },
    {
      name: "Oliver",
      breed: "Bengal Cat",
      age: 1,
      status: "Available",
    },
    {
      name: "Lucy",
      breed: "Beagle",
      age: 3,
      status: "Adopted",
    },
    {
      name: "Simba",
      breed: "Maine Coon",
      age: 2,
      status: "Available",
    },
    {
      name: "Buddy",
      breed: "Bulldog",
      age: 4,
      status: "Available",
    },
    {
      name: "Nala",
      breed: "Ragdoll Cat",
      age: 3,
      status: "Fostered",
    },
  ];
