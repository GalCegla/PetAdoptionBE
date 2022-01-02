import { Joi } from "express-validation";

const SIGNUP_VALIDATION_SCHEMA = {
  body: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    phoneNumber: Joi.string(),
  }),
};

export default SIGNUP_VALIDATION_SCHEMA;
