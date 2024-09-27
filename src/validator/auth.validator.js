import Joi from "joi";

const userRegisterSchema = Joi.object({
  username: Joi.string().required().trim().min(3).max(30),
  email: Joi.string().email().required().trim(),
  password: Joi.string()
    .min(6)
    .required()
    .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
  confirmPassword: Joi.ref("password"),
});

const userLoginSchema = Joi.object({
  email: Joi.string().email().required().trim(),
  password: Joi.string()
    .min(6)
    .required()
    .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
});

export default {
  userRegisterSchema,
  userLoginSchema,
};
