import TokenBlacklist from "../models/tokenBlacklist.model.js";
import userServices from "../services/auth.service.js";

import { CatchAsync } from "../utils/catchAsync.js";

export const registerController = CatchAsync(async (req, res, next) => {
  const { username, email, password } = req.body;

  await userServices.register(username, email, password);

  res.status(201).json({
    status: "success",
    message: "User registered successfully. Please login.",
  });
});

export const loginController = CatchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  const { token, user } = await userServices.login(email, password);
  res.status(200).json({
    status: "success",
    message: "User logged in successfully!",
    data: {
      token,
      user,
    },
  });
});

export const getMeController = CatchAsync(async (req, res, next) => {
  res.status(200).json({
    status: "success",
    message: "User Fetched Successfully!",
    data: req.user,
  });
});

export const logoutController = CatchAsync(async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  await userServices.logout(token);
  res.status(204).json({ message: "User logged out successfully" });
});

export const getAllUsersController = CatchAsync(async (req, res, next) => {
  const users = await userServices.getAllUsers();

  res.status(200).json({
    status: "success",
    message: "All Users Fetched Successfully!",
    results: users.length,
    data: users,
  });
});
