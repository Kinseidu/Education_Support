import { createLogger, format, transports } from "winston";

const { combine, timestamp, printf, errors, colorize, splat } = format;

const logFormat = printf(({ level, message, timestamp: time, stack, ...meta }) => {
  const base = `${time} [${level}]: ${message}`;
  const metaString = Object.keys(meta).length ? ` ${JSON.stringify(meta)}` : "";
  return stack ? `${base}\n${stack}${metaString}` : `${base}${metaString}`;
});

export const logger = createLogger({
  level: process.env.NODE_ENV === "production" ? "info" : "debug",
  format: combine(
    colorize(),
    timestamp(),
    splat(),
    errors({ stack: true }),
    logFormat
  ),
  transports: [new transports.Console()]
});

