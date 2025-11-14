import request from "supertest";
import axios from "axios";
import app from "../src/app";
import { Donation } from "../src/models/Donation";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("Donation routes", () => {
  beforeEach(() => {
    process.env.PAYSTACK_KEY = "test_paystack_key";
    process.env.PAYSTACK_BASE_URL = "https://api.paystack.co";

    mockedAxios.post.mockResolvedValue({
      data: {
        data: {
          authorization_url: "https://paystack.com/pay/abc123",
          access_code: "ACCESS_CODE",
          reference: "abc123"
        }
      }
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("initializes a paystack donation", async () => {
    const response = await request(app).post("/api/donations/initiate").send({
      amount: 150,
      currency: "GHS",
      email: "donor@example.com",
      fullName: "Donor Example",
      provider: "paystack"
    });

    expect(response.statusCode).toBe(201);
    expect(response.body.success).toBe(true);
    expect(response.body.data.authorizationUrl).toContain("https://paystack.com/pay");

    const donation = await Donation.findOne({ email: "donor@example.com" });
    expect(donation).not.toBeNull();
    expect(donation?.status).toBe("pending");
  });
});

