import { Request, Response } from "express";
import os from "os";
import process from "process";
import { sendSuccess } from "../utils/apiResponse";

export const healthCheck = (req: Request, res: Response) => {
  const uptime = process.uptime();
  const memoryUsage = process.memoryUsage();

  return sendSuccess(res, {
    status: "ok",
    uptime,
    timestamp: new Date().toISOString(),
    hostname: os.hostname(),
    memory: {
      rss: memoryUsage.rss,
      heapTotal: memoryUsage.heapTotal,
      heapUsed: memoryUsage.heapUsed
    }
  });
};

