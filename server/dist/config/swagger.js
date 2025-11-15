"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.swaggerSpec = void 0;
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const env_1 = require("./env");
const swaggerDefinition = {
    openapi: "3.0.3",
    info: {
        title: "Token Pay Now API",
        version: "1.0.0",
        description: "API documentation for contact submissions, donations, newsletter subscriptions, and admin content management."
    },
    servers: [
        {
            url: env_1.env.appUrl.replace(/\/$/, ""),
            description: "Current environment"
        },
        {
            url: "http://localhost:5000",
            description: "Local development server"
        }
    ],
    components: {
        securitySchemes: {
            bearerAuth: {
                type: "http",
                scheme: "bearer",
                bearerFormat: "JWT"
            }
        },
        schemas: {
            ContactInput: {
                type: "object",
                required: ["name", "email", "subject", "message"],
                properties: {
                    name: { type: "string" },
                    email: { type: "string", format: "email" },
                    subject: { type: "string" },
                    message: { type: "string" }
                }
            },
            DonationInitiateInput: {
                type: "object",
                required: ["amount", "currency", "email"],
                properties: {
                    amount: { type: "number", example: 150 },
                    currency: { type: "string", example: "GHS" },
                    email: { type: "string", format: "email" },
                    fullName: { type: "string" },
                    provider: { type: "string", enum: ["paystack", "stripe"] },
                    callbackUrl: { type: "string", format: "uri" }
                }
            },
            DonationVerifyInput: {
                type: "object",
                required: ["reference"],
                properties: {
                    reference: { type: "string" },
                    provider: { type: "string", enum: ["paystack", "stripe"] }
                }
            },
            NewsletterInput: {
                type: "object",
                required: ["email"],
                properties: {
                    email: { type: "string", format: "email" }
                }
            },
            NewsInput: {
                type: "object",
                required: ["title", "content"],
                properties: {
                    title: { type: "string" },
                    content: { type: "string" },
                    excerpt: { type: "string" },
                    category: { type: "string" },
                    status: { type: "string", enum: ["draft", "published"] },
                    coverImageUrl: { type: "string", format: "uri" }
                }
            },
            ProgramInput: {
                type: "object",
                required: ["title", "description"],
                properties: {
                    title: { type: "string" },
                    description: { type: "string" },
                    location: { type: "string" },
                    status: { type: "string", enum: ["upcoming", "active", "completed"] },
                    startDate: { type: "string", format: "date-time" },
                    endDate: { type: "string", format: "date-time" }
                }
            },
            LoginInput: {
                type: "object",
                required: ["email", "password"],
                properties: {
                    email: { type: "string", format: "email" },
                    password: { type: "string", format: "password" }
                }
            }
        }
    },
    security: [],
    paths: {
        "/api/health": {
            get: {
                tags: ["Health"],
                summary: "API health status",
                responses: {
                    200: {
                        description: "Health status payload"
                    }
                }
            }
        },
        "/api/contact": {
            post: {
                tags: ["Contact"],
                summary: "Submit contact form",
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: { $ref: "#/components/schemas/ContactInput" }
                        }
                    }
                },
                responses: {
                    201: { description: "Contact submission created" },
                    422: { description: "Validation failed" }
                }
            }
        },
        "/api/donations/initiate": {
            post: {
                tags: ["Donations"],
                summary: "Initiate donation",
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: { $ref: "#/components/schemas/DonationInitiateInput" }
                        }
                    }
                },
                responses: {
                    201: { description: "Donation initialized" },
                    400: { description: "Invalid payload" }
                }
            }
        },
        "/api/donations/verify": {
            post: {
                tags: ["Donations"],
                summary: "Verify donation",
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: { $ref: "#/components/schemas/DonationVerifyInput" }
                        }
                    }
                },
                responses: {
                    200: { description: "Verification result" }
                }
            }
        },
        "/api/newsletter": {
            post: {
                tags: ["Newsletter"],
                summary: "Subscribe to newsletter",
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: { $ref: "#/components/schemas/NewsletterInput" }
                        }
                    }
                },
                responses: {
                    200: { description: "Subscription created" },
                    422: { description: "Validation failed" }
                }
            }
        },
        "/api/news": {
            get: {
                tags: ["News"],
                summary: "List news articles",
                parameters: [
                    {
                        in: "query",
                        name: "status",
                        schema: { type: "string", enum: ["published", "draft", "all"] }
                    }
                ],
                responses: {
                    200: { description: "News collection" }
                }
            },
            post: {
                tags: ["News"],
                summary: "Create news article",
                security: [{ bearerAuth: [] }],
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: { $ref: "#/components/schemas/NewsInput" }
                        }
                    }
                },
                responses: {
                    201: { description: "News created" },
                    401: { description: "Unauthorized" }
                }
            }
        },
        "/api/news/{slug}": {
            get: {
                tags: ["News"],
                summary: "Fetch news article by slug",
                parameters: [
                    {
                        in: "path",
                        name: "slug",
                        required: true,
                        schema: { type: "string" }
                    }
                ],
                responses: {
                    200: { description: "News item" },
                    404: { description: "Not found" }
                }
            }
        },
        "/api/news/{id}": {
            put: {
                tags: ["News"],
                summary: "Update news article",
                security: [{ bearerAuth: [] }],
                parameters: [
                    {
                        in: "path",
                        name: "id",
                        required: true,
                        schema: { type: "string" }
                    }
                ],
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: { $ref: "#/components/schemas/NewsInput" }
                        }
                    }
                },
                responses: {
                    200: { description: "News updated" }
                }
            },
            delete: {
                tags: ["News"],
                summary: "Delete news article",
                security: [{ bearerAuth: [] }],
                parameters: [
                    {
                        in: "path",
                        name: "id",
                        required: true,
                        schema: { type: "string" }
                    }
                ],
                responses: {
                    200: { description: "News deleted" }
                }
            }
        },
        "/api/programs": {
            get: {
                tags: ["Programs"],
                summary: "List programs",
                parameters: [
                    {
                        in: "query",
                        name: "status",
                        schema: { type: "string", enum: ["upcoming", "active", "completed", "all"] }
                    }
                ],
                responses: {
                    200: { description: "Programs collection" }
                }
            },
            post: {
                tags: ["Programs"],
                summary: "Create program",
                security: [{ bearerAuth: [] }],
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: { $ref: "#/components/schemas/ProgramInput" }
                        }
                    }
                },
                responses: {
                    201: { description: "Program created" }
                }
            }
        },
        "/api/programs/{id}": {
            put: {
                tags: ["Programs"],
                summary: "Update program",
                security: [{ bearerAuth: [] }],
                parameters: [
                    { in: "path", name: "id", required: true, schema: { type: "string" } }
                ],
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: { $ref: "#/components/schemas/ProgramInput" }
                        }
                    }
                },
                responses: {
                    200: { description: "Program updated" }
                }
            },
            delete: {
                tags: ["Programs"],
                summary: "Delete program",
                security: [{ bearerAuth: [] }],
                parameters: [
                    { in: "path", name: "id", required: true, schema: { type: "string" } }
                ],
                responses: {
                    200: { description: "Program deleted" }
                }
            }
        },
        "/api/auth/login": {
            post: {
                tags: ["Auth"],
                summary: "Admin login",
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: { $ref: "#/components/schemas/LoginInput" }
                        }
                    }
                },
                responses: {
                    200: { description: "Login success" },
                    401: { description: "Invalid credentials" }
                }
            }
        },
        "/api/auth/me": {
            get: {
                tags: ["Auth"],
                summary: "Current admin profile",
                security: [{ bearerAuth: [] }],
                responses: {
                    200: { description: "Profile payload" },
                    401: { description: "Unauthorized" }
                }
            }
        }
    }
};
exports.swaggerSpec = (0, swagger_jsdoc_1.default)({
    definition: swaggerDefinition,
    apis: []
});
//# sourceMappingURL=swagger.js.map