"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const axios_1 = __importDefault(require("axios"));
const app_1 = __importDefault(require("../src/app"));
const Donation_1 = require("../src/models/Donation");
jest.mock("axios");
const mockedAxios = axios_1.default;
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
        const response = await (0, supertest_1.default)(app_1.default).post("/api/donations/initiate").send({
            amount: 150,
            currency: "GHS",
            email: "donor@example.com",
            fullName: "Donor Example",
            provider: "paystack"
        });
        expect(response.statusCode).toBe(201);
        expect(response.body.success).toBe(true);
        expect(response.body.data.authorizationUrl).toContain("https://paystack.com/pay");
        const donation = await Donation_1.Donation.findOne({ email: "donor@example.com" });
        expect(donation).not.toBeNull();
        expect(donation?.status).toBe("pending");
    });
});
//# sourceMappingURL=donationRoutes.test.js.map