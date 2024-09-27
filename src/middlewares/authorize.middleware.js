import AppError from "../utils/appError.js";

export const authorizeTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      next(new AppError("Forbidden Access", 403));
    }
    next();
  };
};
