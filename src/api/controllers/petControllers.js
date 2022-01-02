import { Router } from "express";
import { validate } from "express-validation";
import NotFoundError from "../../errors/NotFoundError.js";
import PetUnavailableError from "../../errors/PetUnavailableError.js";
import {
  addPet,
  getPet,
  updatePet,
  getPets,
  adoptPet,
  returnPet,
  savePet,
  getUserPets,
  searchPets,
} from "../services/petServices.js";
import {
  ADD_PET_VALIDATION_SCHEMA,
  UPDATE_PET_VALIDATION_SCHEMA,
  ADOPT_PET_VALIDATION_SCHEMA,
  RETURN_PET_VALIDATION_SCHEMA,
  SAVE_PET_VALIDATION_SCHEMA,
} from "../validationSchemas/petValidation.js";

const router = Router();

router.get("/", async (req, res) => {
  const pets = await getPets();
  res.status(200).send(pets);
});

router.post("/", validate(ADD_PET_VALIDATION_SCHEMA), async (req, res) => {
  const data = req.body;
  const addedPet = await addPet(data);
  res.status(201).send(addedPet);
});

router.get("/search", async (req, res) => {
  const { queryData } = req.query;
  const queryDataObject = JSON.parse(queryData);
  const pets = await searchPets(queryDataObject);
  res.status(200).send(pets);
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const pet = await getPet(id);
    res.status(200).send(pet);
  } catch (error) {
    res.status(404).send(error.message);
  }
});

router.put("/:id", validate(UPDATE_PET_VALIDATION_SCHEMA), async (req, res) => {
  const { id } = req.params;
  const data = req.body;
  try {
    const updatedPet = await updatePet(id, data);
    res.status(200).send(updatedPet);
  } catch (error) {
    res.status(404).send(error.message);
  }
});

router.post(
  "/:id/adopt",
  validate(ADOPT_PET_VALIDATION_SCHEMA),
  async (req, res) => {
    const petId = req.params.id;
    const { userId, status } = req.body;
    try {
      const data = await adoptPet(petId, userId, status);
      return res.status(200).send(data);
    } catch (error) {
      if (error instanceof NotFoundError) {
        return res.status(404).send(error.message);
      } else if (error instanceof PetUnavailableError) {
        return res.status(400).send(error.message);
      }
    }
  }
);

router.post(
  "/:id/return",
  validate(RETURN_PET_VALIDATION_SCHEMA),
  async (req, res) => {
    const petId = req.params.id;
    const currentUserId = req.body.userId;
    try {
      const data = await returnPet(petId, currentUserId);
      return res.status(200).send(data);
    } catch (error) {
      if (error instanceof NotFoundError) {
        return res.status(404).send(error.message);
      } else {
        return res.status(400).send(error.message);
      }
    }
  }
);

router.post(
  "/:id/save",
  validate(SAVE_PET_VALIDATION_SCHEMA),
  async (req, res) => {
    const petId = req.params.id;
    const userId = req.body.userId || req.query.userId;
    try {
      const updatedUser = await savePet(petId, userId, req.method);
      return res.status(200).send(updatedUser);
    } catch (error) {
      if (error instanceof NotFoundError) {
        return res.status(404).send(error.message);
      } else {
        return res.status(400).send(error.message);
      }
    }
  }
);

router.delete("/:id/save", async (req, res) => {
  const petId = req.params.id;
  const userId = req.body.userId || req.query.userId;
  try {
    const updatedUser = await savePet(petId, userId, req.method);
    return res.status(200).send(updatedUser);
  } catch (error) {
    if (error instanceof NotFoundError) {
      return res.status(404).send(error.message);
    } else {
      return res.status(400).send(error.message);
    }
  }
});

router.get("/user/:id", async (req, res) => {
  const userId = req.params.id;
  try {
    const data = await getUserPets(userId);
    res.status(200).send(data);
  } catch (error) {
    res.status(404).send(error.message);
  }
});

export default router;
