import mongoose from "mongoose";
import config from "./config.js";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(config.DATABASE_URL);

    console.log("Database Connected Successfully");
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
