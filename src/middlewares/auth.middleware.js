import config from "../config/config.js";
import User from "../models/user.model.js";
import AppError from "../utils/appError.js";
import { CatchAsync } from "../utils/catchAsync.js";
import jwt from "jsonwebtoken";
import TokenBlacklist from "../models/tokenBlacklist.model.js";

export const protect = CatchAsync(async (req, res, next) => {
  const token = req.header("Authorization").replace("Bearer ", "");

  if (!token) {
    next(new AppError("Unauthorized", 401));
  }

  const blackListed = await TokenBlacklist.findOne({ token });

  if (blackListed) {
    next(new AppError("Token has been invalidated", 401));
  }

  const decoded = jwt.verify(token, config.JWT_SECRET);

  const user = await User.findById(decoded.id).select("-password");

  if (!user) {
    next(new AppError("Invalid Token!", 400));
  }

  req.user = user;

  next();
});
