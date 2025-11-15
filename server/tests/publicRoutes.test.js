"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../src/app"));
const ContactSubmission_1 = require("../src/models/ContactSubmission");
const NewsletterSubscriber_1 = require("../src/models/NewsletterSubscriber");
describe("Public API routes", () => {
    it("returns health status", async () => {
        const response = await (0, supertest_1.default)(app_1.default).get("/api/health");
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
        const response = await (0, supertest_1.default)(app_1.default).post("/api/contact").send(payload);
        expect(response.statusCode).toBe(201);
        expect(response.body.success).toBe(true);
        const stored = await ContactSubmission_1.ContactSubmission.findOne({ email: payload.email });
        expect(stored).not.toBeNull();
        expect(stored?.subject).toBe(payload.subject);
    });
    it("subscribes to newsletter", async () => {
        const payload = { email: "subscriber@example.com" };
        const response = await (0, supertest_1.default)(app_1.default).post("/api/newsletter").send(payload);
        expect(response.statusCode).toBe(200);
        expect(response.body.success).toBe(true);
        const stored = await NewsletterSubscriber_1.NewsletterSubscriber.findOne({ email: payload.email });
        expect(stored).not.toBeNull();
        expect(stored?.active).toBe(true);
    });
});
//# sourceMappingURL=publicRoutes.test.js.map