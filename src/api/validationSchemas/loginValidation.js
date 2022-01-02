import { Joi } from "express-validation";

const LOGIN_VALIDATION_SCHEMA = {
  body: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
};

export default LOGIN_VALIDATION_SCHEMA;
