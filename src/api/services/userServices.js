import { ObjectId } from "mongodb";
import bcrypt from "bcryptjs";
import { findManyPets } from "../../DAO/petsDAO.js";
import { findAllUsers, findUser, updateOneUser } from "../../DAO/usersDAO.js";
import NotFoundError from "../../errors/NotFoundError.js";

export async function getUser(id) {
  const user = await findUser(id);
  return user;
}

export async function getUsers() {
  const users = await findAllUsers();
  return users;
}

export function getFullUser() {
  // res.status(200).send("Heres the full user:");
}

export async function updateUser(id, data) {
  const newData = { ...data };
  const existingUser = await findUser(id);
  if (!existingUser) {
    throw new NotFoundError("User doesn't exist");
  }
  if (newData["password"]) {
    const encryptedPassword = await bcrypt.hash(newData["password"], 10);
    newData["password"] = encryptedPassword;
  }
  const updatedUser = await updateOneUser(id, newData);
  return updatedUser;
}

export async function getUserPets(id) {
  const user = await findUser(id);

  const adoptedIds = user.adoptedPets.map((id) => ObjectId(id));
  const fosteredIds = user.fosteredPets.map((id) => ObjectId(id));
  const savedIds = user.savedPets.map((id) => ObjectId(id));

  const adoptedPets = await findManyPets({
    _id: { $in: adoptedIds },
  });
  const fosteredPets = await findManyPets({ _id: { $in: fosteredIds } });
  const savedPets = await findManyPets({ _id: { $in: savedIds } });

  return { adoptedPets, fosteredPets, savedPets };
}
