const { Joi } = require("express-validation");

const credentialsRegisterSchema = {
  body: Joi.object({
    name: Joi.string()
      .max(20)
      .messages({ message: "A Name is Required" })
      .required(),
    username: Joi.string()
      .max(20)
      .messages({ message: "A Username is Required" })
      .required(),
    password: Joi.string()
      .max(20)
      .messages({ message: "A Password is Required" })
      .required(),
  }),
};

const credentialsLoginSchema = {
  body: Joi.object({
    username: Joi.string()
      .messages({ message: "A Username is Required" })
      .required(),
    password: Joi.string()
      .messages({ message: "A Password is Required" })
      .required(),
  }),
};

module.exports = { credentialsRegisterSchema, credentialsLoginSchema };
