import { login, register } from "../services/auth.service.js";

import { CatchAsync } from "../utils/catchAsync.js";

export const registerController = CatchAsync(async (req, res, next) => {
  const { username, email, password } = req.body;

  await register(username, email, password);

  res.status(201).json({
    status: "success",
    message: "User registered successfully. Please login.",
  });
});

export const loginController = CatchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  const { token, user } = await login(email, password);
  res.status(200).json({
    status: "success",
    message: "User logged in successfully!",
    data: {
      token,
      user,
    },
  });
});
