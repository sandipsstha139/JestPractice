// import request from "supertest";
// import jwt from "jsonwebtoken";
// import mongoose from "mongoose";
// import app from "../app.js";
// import User from "../models/user.model.js";
// import connectDB from "../config/database.config.js";
// import config from "../config/config.js";

// const userOneId = new mongoose.Types.ObjectId();
// const userOne = {
//   _id: userOneId,
//   username: "Sandip Shrestha",
//   email: "sandipstha139@gmail.com",
//   password: "user1234",
// };

// beforeEach(async () => {
//   await connectDB();
//   await User.deleteMany();
//   const user = new User(userOne);
//   await user.save();
// });

// afterAll(async () => {
//   await mongoose.connection.close();
// });

// describe("User Authentication", () => {
//   test("Should register a new user", async () => {
//     const response = await request(app).post("/api/v1/auth/register").send({
//       username: "john",
//       email: "sandipstha@gmail.com",
//       password: "user1234",
//     });
//     expect(response.status).toBe(201);
//     expect(response.body.status).toBe("success");
//     expect(response.body.message).toBe(
//       "User registered successfully. Please login."
//     );
//   }, 30000);

//   test("Should login the user", async () => {
//     const response = await request(app).post("/api/v1/auth/login").send({
//       email: userOne.email,
//       password: userOne.password,
//     });

//     expect(response.status).toBe(200);
//     expect(response.body.status).toBe("success");
//     expect(response.body.message).toBe("User logged in successfully!");

//     expect(response.body.data.user.email).toBe(userOne.email);
//     expect(response.body.data.user.name).toBe(userOne.name);
//   });
// });

test("1 + 1 equals 2", () => {
  expect(1 + 1).toBe(2);
});
