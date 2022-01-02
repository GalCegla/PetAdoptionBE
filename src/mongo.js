import { MongoClient } from "mongodb";
import connectPets from "./DAO/petsDAO.js";
import connectUsers from "./DAO/usersDAO.js";
import dotenv from "dotenv";
dotenv.config();

const client = new MongoClient(process.env.MONGO_URL);

function connect() {
  client.connect((error, database) => {
    if (error) {
      console.log(error.message);
    } else {
      connectUsers(database);
      connectPets(database);
      console.log("connected!");
    }
  });
}

export default connect;
