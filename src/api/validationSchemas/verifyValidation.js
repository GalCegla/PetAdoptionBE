import { Joi } from "express-validation";

const VERIFY_VALIDATION_SCHEMA = {
  body: Joi.object({
    token: Joi.string().required(),
  }),
};

export default VERIFY_VALIDATION_SCHEMA;
