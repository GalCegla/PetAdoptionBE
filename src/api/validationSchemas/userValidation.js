import { Joi } from "express-validation";

const UPDATE_USER_VALIDATION_SCHEMA = {
  body: Joi.object({
    email: Joi.string().email(),
    password: Joi.string(),
    firstName: Joi.string(),
    lastName: Joi.string(),
    phoneNumber: Joi.string(),
    role: Joi.string(),
    adoptedPets: Joi.array(),
    fosteredPets: Joi.array(),
    savedPets: Joi.array(),
  }),
};

export default UPDATE_USER_VALIDATION_SCHEMA;
