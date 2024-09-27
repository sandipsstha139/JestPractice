import TokenBlacklist from "../models/tokenBlacklist.model.js";
import User from "../models/user.model.js";
import AppError from "../utils/appError.js";
import { CatchAsync } from "../utils/catchAsync.js";

const login = async (email, password) => {
  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    throw new AppError("Invalid Credentials", 401);
  }

  if (!user || !(await user.isPasswordMatch(password))) {
    throw new AppError("Invalid Credentials", 401);
  }
  const token = user.generateAuthToken();
  const { password: userPassword, ...rest } = user._doc;

  return { user: rest, token };
};

const register = async (username, email, password) => {
  let user = await User.findOne({ email });

  if (user) {
    throw new AppError("User Already Exists!", 409);
  }

  await User.create({ username, email, password });
};

const getAllUsers = async () => {
  const users = await User.find();
  return users;
};

const logout = async (token) => {
  if (token) {
    await TokenBlacklist.create({ token });
  }
};

export default { login, register, getAllUsers, logout };
