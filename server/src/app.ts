import "express-async-errors";
import express from "express";
import helmet from "helmet";
import cors from "cors";
import compression from "compression";
import mongoSanitize from "express-mongo-sanitize";
import xssClean from "xss-clean";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import swaggerUi from "swagger-ui-express";
import { env } from "./config/env";
import { apiRateLimiter } from "./middleware/rateLimiter";
import routes from "./routes";
import { errorHandler } from "./middleware/errorHandler";
import { notFoundHandler } from "./middleware/notFound";
import { swaggerSpec } from "./config/swagger";

const app = express();

app.set("trust proxy", 1);

const allowedOrigins = env.clientOrigin
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

app.use(helmet());
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) {
        return callback(null, true);
      }
      if (
        allowedOrigins.includes(origin) ||
        origin.startsWith("http://localhost") ||
        origin.startsWith("https://localhost")
      ) {
        return callback(null, true);
      }
      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true
  })
);
app.use(compression());
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(mongoSanitize());
app.use(xssClean());
app.use(apiRateLimiter);
app.use(morgan(env.nodeEnv === "production" ? "combined" : "dev"));

if (env.nodeEnv === "production") {
  app.use((req, res, next) => {
    if (req.headers["x-forwarded-proto"] !== "https") {
      return res.redirect(301, `https://${req.headers.host}${req.originalUrl}`);
    }
    return next();
  });
}

app.get("/", (_req, res) => {
  res.json({
    success: true,
    message: "Token Pay Now API",
    docs: "/docs"
  });
});

if (env.swaggerEnabled) {
  app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}

app.use("/api", routes);

app.use(notFoundHandler);
app.use(errorHandler);

export default app;

