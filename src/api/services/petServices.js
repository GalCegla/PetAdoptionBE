import {
  findAllPets,
  findPet,
  updateOnePet,
  createPet,
  findManyPets,
} from "../../DAO/petsDAO.js";
import { findUser, updateOneUser } from "../../DAO/usersDAO.js";
import NotFoundError from "../../errors/NotFoundError.js";
import PetUnavailableError from "../../errors/PetUnavailableError.js";

export async function getPet(id) {
  const pet = await findPet(id);
  if (!pet) {
    throw new NotFoundError("Pet not found");
  }
  return pet;
}

export async function getPets() {
  const pets = await findAllPets();
  return pets;
}

export async function addPet(data) {
  const pet = await createPet(data);
  return pet;
}

export async function updatePet(id, data) {
  const existingPet = await findPet(id);
  if (!existingPet) {
    throw new NotFoundError("This pet does not exist!");
  }
  const updatedPet = await updateOnePet(id, data);
  return updatedPet;
}

export async function adoptPet(petId, userId, petStatus) {
  const pet = await findPet(petId);
  const user = await findUser(userId);
  if (!pet || !user) {
    throw new NotFoundError(`${!pet ? "Pet" : "User"} not found :(`);
  }
  if (pet.status != "Available") {
    throw new PetUnavailableError(
      "The pet is not available for adoption/fostering."
    );
  }
  const updatePetData = { userId, status: petStatus };
  const updatedPet = await updateOnePet(petId, updatePetData);
  let updatedUser;
  switch (petStatus) {
    case "Adopted":
      const updatedAdoptData = { adoptedPets: [...user.adoptedPets, petId] };
      updatedUser = await updateOneUser(userId, updatedAdoptData);
      break;
    case "Fostered":
      const updatedFosterData = { fosteredPets: [...user.fosteredPets, petId] };
      updatedUser = await updateOneUser(userId, updatedFosterData);
      break;
  }
  const sendData = { updatedPet, updatedUser };
  return sendData;
}

export async function returnPet(petId, currentUserId) {
  const pet = await findPet(petId);
  if (!pet) {
    throw new NotFoundError("Pet not found.");
  }
  const { userId, status } = pet;
  if (userId != currentUserId) {
    throw new Error("This is not your pet!");
  }
  const user = await findUser(userId);
  if (!user) {
    throw new NotFoundError("User not found, or pet might not have a user.");
  }
  const updatePetData = { status: "Available", userId: "" };
  const updatedPet = await updateOnePet(petId, updatePetData);

  let updatedUser;

  switch (status) {
    case "Adopted":
      const adoptedPets = [...user.adoptedPets];
      const indexOfAdoptedPet = adoptedPets.indexOf(petId);
      adoptedPets.splice(indexOfAdoptedPet, 1);
      updatedUser = await updateOneUser(userId, { adoptedPets });
      break;
    case "Fostered":
      const fosteredPets = [...user.fosteredPets];
      const indexOfFosteredPet = fosteredPets.indexOf(petId);
      fosteredPets.splice(indexOfFosteredPet, 1);
      updatedUser = await updateOneUser(userId, { fosteredPets });
      break;
  }

  const sendData = { updatedPet, updatedUser };

  return sendData;
}

export async function savePet(petId, userId, method) {
  const pet = await findPet(petId);
  const user = await findUser(userId);
  if (!pet || !user) {
    throw new NotFoundError(`${!pet ? "Pet" : "User"} not found.`);
  }

  const savedPets = [...user.savedPets];
  let updatedUser;
  switch (method) {
    case "POST":
      if (savedPets.includes(petId)) {
        throw new Error("Pet already saved");
      }
      savedPets.push(petId);
      updatedUser = await updateOneUser(userId, { savedPets });
      break;
    case "DELETE":
      if (!savedPets.includes(petId)) {
        throw new NotFoundError("Pet not saved");
      }
      const indexOfPet = savedPets.indexOf(petId);
      savedPets.splice(indexOfPet, 1);
      updatedUser = await updateOneUser(userId, { savedPets });
      break;
  }
  return updatedUser;
}

export async function getUserPets(userId) {
  const user = await findUser(userId);
  if (!user) {
    throw new NotFoundError("User not found.");
  }
  const data = {
    name: `${user.firstName} ${user.lastName}`,
    adoptedPets: user.adoptedPets,
    fosteredPets: user.fosteredPets,
  };
  return data;
}

export async function searchPets(queryData) {
  const query = {};
  for (const property in queryData) {
    query[property] = { $eq: queryData[property] };
  }
  const pets = await findManyPets(query);
  return pets;
}
