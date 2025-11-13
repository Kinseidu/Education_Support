import { NextFunction, Request, Response } from "express";
import { NewsletterSubscriber } from "../models/NewsletterSubscriber";
import { validateNewsletterInput } from "../validators/newsletter.validator";
import { sendSuccess } from "../utils/apiResponse";

export const subscribeNewsletter = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const input = validateNewsletterInput(req.body);

    let subscriber = await NewsletterSubscriber.findOne({ email: input.email });

    if (subscriber) {
      if (!subscriber.active) {
        subscriber.active = true;
        subscriber.subscribedAt = new Date();
        subscriber.unsubscribedAt = undefined;
        await subscriber.save();
      }
    } else {
      subscriber = await NewsletterSubscriber.create({
        email: input.email
      });
    }

    return sendSuccess(
      res,
      {
        id: subscriber.id,
        email: subscriber.email
      },
      "Subscription successful."
    );
  } catch (error) {
    return next(error);
  }
};

