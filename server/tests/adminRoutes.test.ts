import request from "supertest";
import app from "../src/app";
import { Admin } from "../src/models/Admin";
import { News } from "../src/models/News";

describe("Admin protected routes", () => {
  let token: string;

  beforeAll(async () => {
    await Admin.create({
      email: "admin@example.com",
      password: "password123",
      name: "Admin User"
    });
  });

  it("allows admin login", async () => {
    const response = await request(app).post("/api/auth/login").send({
      email: "admin@example.com",
      password: "password123"
    });

    expect(response.statusCode).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.data.token).toBeDefined();
    token = response.body.data.token;
  });

  it("creates news article with valid token", async () => {
    const payload = {
      title: "New Program Launch",
      content: "We are excited to announce a new program to support students.",
      status: "published"
    };

    const response = await request(app)
      .post("/api/news")
      .set("Authorization", `Bearer ${token}`)
      .send(payload);

    expect(response.statusCode).toBe(201);
    expect(response.body.success).toBe(true);

    const stored = await News.findOne({ title: payload.title });
    expect(stored).not.toBeNull();
    expect(stored?.status).toBe("published");
  });
});

