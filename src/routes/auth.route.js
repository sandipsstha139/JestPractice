import express from "express";
import {
  getAllUsersController,
  getMeController,
  loginController,
  logoutController,
  registerController,
} from "../controllers/auth.controller.js";
import validate from "../middlewares/validate.js";
import validationSchemas from "../validator/auth.validator.js";
import { protect } from "../middlewares/auth.middleware.js";
import { authorizeTo } from "../middlewares/authorize.middleware.js";

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

authRouter.get("/me", protect, getMeController);
authRouter.get("/logout", protect, logoutController);
authRouter.get("/users", protect, authorizeTo("admin"), getAllUsersController);

export default authRouter;
