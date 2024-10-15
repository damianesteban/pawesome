import { prisma } from "@/lib/prisma";

export const data = [
    {
      "name": "Lucky",
      "animalType": "DOG",
      "breed": "Golden Retriever"
    },
    {
      "name": "Whiskers",
      "animalType": "CAT",
      "breed": "Siamese"
    },
    {
      "name": "Rover",
      "animalType": "DOG",
      "breed": "Labrador"
    },
    {
      "name": "Mittens",
      "animalType": "CAT",
      "breed": "Persian"
    },
    {
      "name": "Buddy",
      "animalType": "DOG",
      "breed": "Beagle"
    },
    {
      "name": "Shadow",
      "animalType": "CAT",
      "breed": "Maine Coon"
    },
    {
      "name": "Max",
      "animalType": "DOG",
      "breed": "German Shepherd"
    },
    {
      "name": "Snowball",
      "animalType": "CAT",
      "breed": "Ragdoll"
    },
    {
      "name": "Bailey",
      "animalType": "DOG",
      "breed": "Bulldog"
    },
    {
      "name": "Tiger",
      "animalType": "CAT",
      "breed": "Bengal"
    },
    {
      "name": "Duke",
      "animalType": "DOG",
      "breed": "Boxer"
    },
    {
      "name": "Oliver",
      "animalType": "CAT",
      "breed": "Russian Blue"
    },
    {
      "name": "Rocky",
      "animalType": "DOG",
      "breed": "Poodle"
    },
    {
      "name": "Luna",
      "animalType": "CAT",
      "breed": "British Shorthair"
    },
    {
      "name": "Zeus",
      "animalType": "DOG",
      "breed": "Doberman"
    },
    {
      "name": "Felix",
      "animalType": "CAT",
      "breed": "Abyssinian"
    },
    {
      "name": "Charlie",
      "animalType": "DOG",
      "breed": "Cocker Spaniel"
    },
    {
      "name": "Bella",
      "animalType": "CAT",
      "breed": "Scottish Fold"
    },
    {
      "name": "Cooper",
      "animalType": "DOG",
      "breed": "Great Dane"
    },
    {
      "name": "Ginger",
      "animalType": "CAT",
      "breed": "Turkish Van"
    },
    {
      "name": "Teddy",
      "animalType": "DOG",
      "breed": "Chihuahua"
    },
    {
      "name": "Simba",
      "animalType": "CAT",
      "breed": "Sphynx"
    },
    {
      "name": "Bruno",
      "animalType": "DOG",
      "breed": "Rottweiler"
    },
    {
      "name": "Milo",
      "animalType": "CAT",
      "breed": "American Shorthair"
    },
    {
      "name": "Harley",
      "animalType": "DOG",
      "breed": "Shih Tzu"
    }
  ];

const seedData = async () => {
    for (const pet of data) {
        await prisma.rescue.create({
            data: {
                name: pet.name,
                animalType: pet.animalType as any,
                breed: pet.breed,
            }
        });
        console.log(`Created pet: ${pet.name}`);
    }
}

seedData().catch((e) => {
    console.error(e);
})

