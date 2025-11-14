import request from "supertest";
import app from "../src/app";
import { ContactSubmission } from "../src/models/ContactSubmission";
import { NewsletterSubscriber } from "../src/models/NewsletterSubscriber";

describe("Public API routes", () => {
  it("returns health status", async () => {
    const response = await request(app).get("/api/health");
    expect(response.statusCode).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.data.status).toBe("ok");
  });

  it("creates contact submission", async () => {
    const payload = {
      name: "John Doe",
      email: "john@example.com",
      subject: "Support request",
      message: "I would love to learn more about your programs."
    };

    const response = await request(app).post("/api/contact").send(payload);

    expect(response.statusCode).toBe(201);
    expect(response.body.success).toBe(true);

    const stored = await ContactSubmission.findOne({ email: payload.email });
    expect(stored).not.toBeNull();
    expect(stored?.subject).toBe(payload.subject);
  });

  it("subscribes to newsletter", async () => {
    const payload = { email: "subscriber@example.com" };

    const response = await request(app).post("/api/newsletter").send(payload);

    expect(response.statusCode).toBe(200);
    expect(response.body.success).toBe(true);

    const stored = await NewsletterSubscriber.findOne({ email: payload.email });
    expect(stored).not.toBeNull();
    expect(stored?.active).toBe(true);
  });
});

