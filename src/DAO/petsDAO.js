import { ObjectId } from "mongodb";

let db;

export default async function connectPets(connection) {
  db = connection.db("pets").collection("pets");
}
// export default async function getCollection(connection) {
//   const database = await connection.db("pets");
//   database.runCommand({
//     collMod: "pets",
//     validator: {
//       $jsonSchema: {
//         bsonType: "object",
//         required: [
//           "name",
//           "type",
//           "status",
//           "picture",
//           "height",
//           "weight",
//           "color",
//           "bio",
//           "hypoallergenic",
//           "diet",
//           "breed",
//         ],
//         properties: {
//           name: {
//             bsonType: "string",
//             description: "must be a string and is required",
//           },
//           type: {
//             bsonType: "string",
//             description: "must be a string and is required",
//           },
//           status: {
//             bsonType: "string",
//             description: "must be a string and is required",
//           },
//           picture: {
//             bsonType: "string",
//             description: "must be a string and is required",
//           },
//           height: {
//             bsonType: "number",
//             description: "must be a number and is required",
//           },
//           weight: {
//             bsonType: "number",
//             description: "must be a number and is required",
//           },
//           color: {
//             bsonType: "string",
//             description: "must be a string and is required",
//           },
//           bio: {
//             bsonType: "string",
//             description: "must be a string and is required",
//           },
//           hypoallergenic: {
//             bsonType: "boolean",
//             description: "must be a boolean and is required",
//           },
//           diet: {
//             bsonType: "string",
//             description: "must be a string and is required",
//           },
//           breed: {
//             bsonType: "string",
//             description: "must be a string and is required",
//           },
//         },
//       },
//     },
//     validationLevel: "moderate",
//   });
//   const collection = db.collection("pets");
//   collection.createIndex();
//   db = collection;
// }

export async function findAllPets() {
  const pets = await db.find({}).toArray();
  return pets;
}

export async function findPet(id) {
  const petId = new ObjectId(id);
  const pet = await db.findOne({ _id: petId });
  return pet;
}

export async function createPet(data) {
  try {
    const pet = await db.insertOne(data);
    return pet;
  } catch (error) {
    console.log(error);
  }
}

export async function updateOnePet(id, data) {
  if (data["id"] || data["_id"]) {
    throw new Error("You can't change an ID.");
  }
  const petId = new ObjectId(id);
  const updatedPet = await db.updateOne({ _id: petId }, { $set: data });
  return updatedPet;
}

export async function findManyPets(query) {
  const pets = await db.find(query).toArray();
  return pets;
}
