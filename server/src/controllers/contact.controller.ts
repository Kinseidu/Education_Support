import { NextFunction, Request, Response } from "express";
import { ContactSubmission } from "../models/ContactSubmission";
import { validateContactInput } from "../validators/contact.validator";
import { sendSuccess } from "../utils/apiResponse";
import { sendEmail } from "../services/email.service";
import { logger } from "../config/logger";

export const handleContactSubmission = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const input = validateContactInput(req.body);

    const submission = await ContactSubmission.create(input);

    // Best-effort notification
    try {
      await sendEmail({
        to: input.email,
        subject: "We received your message",
        text: `Hi ${input.name},\n\nThank you for contacting us. Our team will respond shortly.\n\nSubject: ${input.subject}\n\nMessage:\n${input.message}\n\nBest regards,\nAcademic Excellence Team`
      });
    } catch (emailError) {
      logger.warn("Unable to send contact confirmation email", emailError as Error);
    }

    return sendSuccess(
      res,
      {
        id: submission.id,
        status: submission.status
      },
      "Message received successfully.",
      201
    );
  } catch (error) {
    return next(error);
  }
};

