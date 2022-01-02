import { Joi } from "express-validation";
export const ADD_PET_VALIDATION_SCHEMA = {
  body: Joi.object({
    type: Joi.string().required(),
    name: Joi.string().required(),
    status: Joi.string().valid("Adopted", "Fostered", "Available").required(),
    picture: Joi.string().uri().required(),
    height: Joi.number(),
    weight: Joi.number(),
    color: Joi.string(),
    bio: Joi.string(),
    hypoallergenic: Joi.boolean().required(),
    diet: Joi.string(),
    breed: Joi.string(),
    userId: Joi.string(),
  }),
};

export const UPDATE_PET_VALIDATION_SCHEMA = {
  body: Joi.object({
    type: Joi.string(),
    name: Joi.string(),
    status: Joi.string().valid("Adopted", "Fostered", "Available"),
    picture: Joi.string().uri(),
    height: Joi.number(),
    weight: Joi.number(),
    color: Joi.string(),
    bio: Joi.string(),
    hypoallergenic: Joi.boolean(),
    diet: Joi.string(),
    breed: Joi.string(),
    userId: Joi.string(),
  }),
};

export const ADOPT_PET_VALIDATION_SCHEMA = {
  body: Joi.object({
    userId: Joi.string().required(),
    status: Joi.string().valid("Adopted", "Fostered"),
  }),
};

export const RETURN_PET_VALIDATION_SCHEMA = {
  body: Joi.object({
    userId: Joi.string().required(),
  }),
};

export const SAVE_PET_VALIDATION_SCHEMA = {
  body: Joi.object({
    userId: Joi.string().required(),
  }),
};
