import http from "http";
import app from "./app";
import { env } from "./config/env";
import { connectDatabase } from "./config/database";
import { logger } from "./config/logger";

const startServer = async () => {
  try {
    await connectDatabase();

    const server = http.createServer(app);

    server.listen(env.port, () => {
      logger.info(`Server running on port ${env.port}`);
    });

    const shutdown = async () => {
      logger.info("Shutting down gracefully...");
      server.close(() => {
        logger.info("HTTP server closed.");
        process.exit(0);
      });
    };

    process.on("SIGINT", shutdown);
    process.on("SIGTERM", shutdown);
  } catch (error) {
    logger.error("Failed to start server", error as Error);
    process.exit(1);
  }
};

startServer();

