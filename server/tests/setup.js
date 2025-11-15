"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const mongodb_memory_server_1 = require("mongodb-memory-server");
let mongo;
beforeAll(async () => {
    mongo = await mongodb_memory_server_1.MongoMemoryServer.create();
    const uri = mongo.getUri();
    process.env.MONGODB_URI = uri;
    process.env.JWT_SECRET = "test-secret";
    process.env.CLIENT_ORIGIN = "http://localhost:3000";
    process.env.NODE_ENV = "test";
    process.env.SWAGGER_ENABLED = "false";
    await mongoose_1.default.connect(uri);
});
afterEach(async () => {
    const db = mongoose_1.default.connection.db;
    if (!db) {
        return;
    }
    const collections = await db.collections();
    for (const collection of collections) {
        await collection.deleteMany({});
    }
});
afterAll(async () => {
    await mongoose_1.default.connection.close();
    await mongo.stop();
});
//# sourceMappingURL=setup.js.map