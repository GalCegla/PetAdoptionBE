import { ObjectId } from "mongodb";

let db;
export default async function connectUsers(connection) {
  db = connection.db("pets").collection("users");
}

export async function findAllUsers() {
  const users = await db.find({}).toArray();
  return users;
}

export async function findUser(id) {
  const userId = new ObjectId(id);
  const user = await db.findOne({ _id: userId });
  return user;
}

export async function findUserWithEmail(email) {
  const user = await db.findOne({ email });
  return user;
}

export async function findUserWithEmailAndPassword(email, password) {
  const user = await db.findOne({ $and: [{ email }, { password }] });
  return user;
}

export async function createUser(data) {
  try {
    const user = await db.insertOne(data);
    return user;
  } catch (error) {
    console.log(error);
  }
}

export async function updateOneUser(id, data) {
  const userId = new ObjectId(id);
  const updatedUser = await db.updateOne({ _id: userId }, { $set: data });
  return updatedUser;
}
