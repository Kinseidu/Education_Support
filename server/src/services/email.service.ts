import nodemailer, { Transporter } from "nodemailer";
import { env } from "../config/env";
import { logger } from "../config/logger";

let transporter: Transporter | null = null;

const buildTransporter = (): Transporter | null => {
  if (!env.emailService || !env.emailUser || !env.emailPass) {
    logger.warn("Email service credentials missing. Emails will be logged only.");
    return null;
  }

  return nodemailer.createTransport({
    service: env.emailService,
    auth: {
      user: env.emailUser,
      pass: env.emailPass
    }
  });
};

const getTransporter = (): Transporter | null => {
  if (transporter) {
    return transporter;
  }

  transporter = buildTransporter();
  return transporter;
};

interface EmailPayload {
  to: string | string[];
  subject: string;
  html?: string;
  text?: string;
}

export const sendEmail = async ({ to, subject, html, text }: EmailPayload) => {
  const mailer = getTransporter();

  const payload = {
    from: env.emailFrom,
    to,
    subject,
    text,
    html
  };

  if (!mailer) {
    logger.info("Email transport not configured. Email payload logged.", payload);
    return;
  }

  await mailer.sendMail(payload);
  logger.info("Email dispatched successfully", { to });
};

