import { Router } from "express";
import { validate } from "express-validation";
import {
  getUser,
  updateUser,
  getUsers,
  getFullUser,
  getUserPets,
} from "../services/userServices.js";
import UPDATE_USER_VALIDATION_SCHEMA from "../validationSchemas/userValidation.js";
const router = Router();

router.get("/", async (req, res) => {
  const users = await getUsers();
  res.status(200).send(users);
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const user = await getUser(id);
  if (!user) {
    return res.status(404).send("User not found!");
  }
  res.status(200).send(user);
});

router.put(
  "/:id",
  validate(UPDATE_USER_VALIDATION_SCHEMA),
  async (req, res) => {
    const { id } = req.params;
    const data = req.body;
    try {
      const updatedUser = await updateUser(id, data);
      res.status(200).send(updatedUser);
    } catch (error) {
      res.status(404).send(error.message);
    }
  }
);

router.get("/:id/full", getFullUser);

router.get("/:id/pets", async (req, res) => {
  const { id } = req.params;
  try {
    const pets = await getUserPets(id);
    return res.status(200).send(pets);
  } catch (error) {
    return res.status(400).send(error);
  }
});

export default router;
