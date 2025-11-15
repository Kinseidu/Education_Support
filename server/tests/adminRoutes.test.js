"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../src/app"));
const Admin_1 = require("../src/models/Admin");
const News_1 = require("../src/models/News");
describe("Admin protected routes", () => {
    let token;
    beforeAll(async () => {
        await Admin_1.Admin.create({
            email: "admin@example.com",
            password: "password123",
            name: "Admin User"
        });
    });
    it("allows admin login", async () => {
        const response = await (0, supertest_1.default)(app_1.default).post("/api/auth/login").send({
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
        const response = await (0, supertest_1.default)(app_1.default)
            .post("/api/news")
            .set("Authorization", `Bearer ${token}`)
            .send(payload);
        expect(response.statusCode).toBe(201);
        expect(response.body.success).toBe(true);
        const stored = await News_1.News.findOne({ title: payload.title });
        expect(stored).not.toBeNull();
        expect(stored?.status).toBe("published");
    });
});
//# sourceMappingURL=adminRoutes.test.js.map