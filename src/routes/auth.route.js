import express from "express";
import {
  loginController,
  registerController,
} from "../controllers/user.controller.js";
import validate from "../middlewares/validate.js";
import validationSchemas from "../validator/auth.validator.js";

const authRouter = express.Router();

authRouter.post(
  "/register",
  validate(validationSchemas.userRegisterSchema),
  registerController
);

authRouter.post(
  "/login",
  validate(validationSchemas.userLoginSchema),
  loginController
);

export default authRouter;
