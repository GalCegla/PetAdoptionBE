import express, { json } from "express";
import petControllers from "./src/api/controllers/petControllers.js";
import userControllers from "./src/api/controllers/userControllers.js";
import { ValidationError, validate } from "express-validation";
import addUser from "./src/api/services/signupServices.js";
import SIGNUP_VALIDATION_SCHEMA from "./src/api/validationSchemas/signupValidation.js";
import LOGIN_VALIDATION_SCHEMA from "./src/api/validationSchemas/loginValidation.js";
import logIn from "./src/api/services/loginServices.js";
import connect from "./src/mongo.js";
import cors from "cors";
import VERIFY_VALIDATION_SCHEMA from "./src/api/validationSchemas/verifyValidation.js";
import verifyController from "./src/api/services/verifyServices.js";
import imagekitController from "./src/api/services/imagekitServices.js";

const app = express();
const port = 5000;

app.use(function (err, req, res, next) {
  if (err instanceof ValidationError) {
    return res.status(err.statusCode).json(err);
  }

  return res.status(500).json(err);
});

app.use(json());
app.use(cors());

app.use("/user", userControllers);

app.use("/pet", petControllers);

app.post("/signup", validate(SIGNUP_VALIDATION_SCHEMA), addUser);
app.post("/login", validate(LOGIN_VALIDATION_SCHEMA), logIn);
app.post("/auth/verify", validate(VERIFY_VALIDATION_SCHEMA), verifyController);
app.get("/auth/imagekit", imagekitController);

app.listen(port, () => {
  connect();
  console.log(`Listening @ http://localhost:${port}`);
});
