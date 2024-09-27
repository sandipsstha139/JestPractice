import dotenv from "dotenv";

if (process.env.NODE_ENV === "development") {
  dotenv.config({
    path: "./dev.env",
  });
} else if (process.env.NODE_ENV === "test") {
  dotenv.config({
    path: "./test.env",
  });
}

export default {
  PORT: process.env.PORT || 3000,
  DATABASE_URL: process.env.DATABASE_URL,
  JWT_SECRET: process.env.JWT_SECRET,
  JWT_EXPIRE: process.env.JWT_EXPIRE,
};
