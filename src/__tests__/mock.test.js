import request from "supertest";
import app from "../app.js";
import userServices from "../services/auth.service.js";
import { getMeController } from "../controllers/auth.controller.js";

jest.mock("../services/auth.service.js");

describe("User Authentication With Mock Values ", () => {
  let token;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("Should register a new user", async () => {
    userServices.register.mockResolvedValue();

    const response = await request(app)
      .post("/api/v1/auth/register")
      .set("Content-Type", "application/json")
      .send({
        username: "testuser",
        email: "test@example.com",
        password: "password123",
      });

    expect(response.status).toBe(201);
    expect(response.body.status).toBe("success");
    expect(response.body.message).toBe(
      "User registered successfully. Please login."
    );
    expect(userServices.register).toHaveBeenCalledWith(
      "testuser",
      "test@example.com",
      "password123"
    );
  });

  it("Should login with valid credentials", async () => {
    const mockUser = {
      _id: "1",
      username: "testuser",
      email: "test@example.com",
      createdAt: "2021-10-10T00:00:00.000Z",
      updatedAt: "2021-10-10T00:00:00.000Z",
      __v: 0,
    };
    token = "mockToken";

    userServices.login.mockResolvedValue({
      token,
      user: mockUser,
    });

    const response = await request(app)
      .post("/api/v1/auth/login")
      .set("Content-Type", "application/json")
      .send({
        email: "test@example.com",
        password: "password123",
      });

    expect(response.status).toBe(200);
    expect(response.body.status).toBe("success");
    expect(response.body.message).toBe("User logged in successfully!");
    expect(response.body.data.token).toBe(token);
    expect(response.body.data.user).toEqual(mockUser);
    expect(userServices.login).toHaveBeenCalledWith(
      "test@example.com",
      "password123"
    );
  });

  it("Should Get Current User", async () => {
    const mockUser = {
      _id: "1",
      username: "testuser",
      email: "test@example.com",
      createdAt: "2021-10-10T00:00:00.000Z",
      updatedAt: "2021-10-10T00:00:00.000Z",
      __v: 0,
    };

    const req = {
      user: mockUser,
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    getMeController(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      status: "success",
      message: "User Fetched Successfully!",
      data: mockUser,
    });
  });
});
