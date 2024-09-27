import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
import config from "../config/config.js";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Username is required."],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required."],
      unique: [true, "Email already exists."],
      trim: true,
      validator: (value) => {
        if (!validator.isEmail(value)) {
          throw new Error({ error: "Invalid Email Address" });
        }
      },
    },
    password: {
      type: String,
      required: [true, "Password is required."],
      minLength: [6, "Password Must contain at least 6 characters."],
      select: false,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = bcrypt.hashSync(this.password, 10);
  next();
});

userSchema.methods.isPasswordMatch = async function (password) {
  return bcrypt.compareSync(password, this.password);
};

userSchema.methods.generateAuthToken = function () {
  return jwt.sign({ id: this._id }, config.JWT_SECRET, {
    expiresIn: config.JWT_EXPIRE,
  });
};

const User = mongoose.model("User", userSchema);

export default User;
