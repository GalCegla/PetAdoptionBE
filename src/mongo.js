import { MongoClient } from "mongodb";
import connectPets from "./DAO/petsDAO.js";
import connectUsers from "./DAO/usersDAO.js";
import dotenv from "dotenv";
dotenv.config();

const client = new MongoClient(process.env.MONGO_URL);

function connect() {
  client.connect(async (error, database) => {
    if (error) {
      console.log(error.message);
      console.log("Error with DB connection", error.message);
      process.kill(1);
    } else {
      try {
        await connectUsers(database);
        await connectPets(database);
        console.log("connected!");
      } catch (error) {
        console.log("Error with collections connection", error.message);
      }
    }
  });
}

export default connect;
