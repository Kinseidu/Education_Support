import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import Stripe from "stripe";
import { env } from "../config/env";
import { Donation } from "../models/Donation";
import { AppError } from "../utils/appError";
import { logger } from "../config/logger";

// Stripe singleton
let stripeClient: Stripe | null = null;
const getStripeClient = () => {
  if (!env.stripeSecret) throw new AppError("Stripe secret key not configured", 500);
  if (!stripeClient) {
    stripeClient = new Stripe(env.stripeSecret, {
      apiVersion: "2024-09-30" as const,
    });
  }
  return stripeClient;
};

const buildReference = () => uuidv4();

interface DonationInput {
  amount: number;
  currency: string;
  email: string;
  fullName?: string;
  provider?: "paystack" | "stripe";
  metadata?: Record<string, any>;
  callbackUrl?: string;
}

export const initiateDonation = async (input: DonationInput) => {
  const reference = buildReference();

  const donation = await Donation.create({
    amount: input.amount,
    currency: input.currency,
    email: input.email,
    fullName: input.fullName,
    provider: input.provider ?? "paystack",
    reference,
    status: "pending",
    metadata: input.metadata,
  });

  if ((input.provider ?? "paystack") === "paystack") {
    if (!env.paystackKey) throw new AppError("Paystack secret key not configured", 500);

    const response = await axios.post(
      `${env.paystackBaseUrl}/transaction/initialize`,
      {
        email: input.email,
        amount: Math.round(input.amount * 100),
        currency: input.currency,
        callback_url: input.callbackUrl,
        reference,
        metadata: {
          fullName: input.fullName,
          ...input.metadata,
        },
      },
      {
        headers: {
          Authorization: `Bearer ${env.paystackKey}`,
          "Content-Type": "application/json",
        },
      }
    );

    donation.gatewayResponse = response.data.data as Record<string, unknown>;
    await donation.save();

    return {
      provider: "paystack",
      reference,
      authorizationUrl: response.data.data.authorization_url,
      accessCode: response.data.data.access_code,
    };
  }

  // Stripe
  const stripe = getStripeClient();
  const paymentIntent = await stripe.paymentIntents.create({
    amount: Math.round(input.amount * 100),
    currency: input.currency.toLowerCase(),
    receipt_email: input.email,
    metadata: {
      reference,
      fullName: input.fullName ?? "",
      ...input.metadata,
    },
    automatic_payment_methods: { enabled: true },
  });

  donation.reference = paymentIntent.id;
  donation.gatewayResponse = paymentIntent;
  await donation.save();

  return {
    provider: "stripe",
    reference: paymentIntent.id,
    clientSecret: paymentIntent.client_secret,
  };
};

export const verifyDonation = async (input: { reference: string; provider?: "paystack" | "stripe" }) => {
  const donation = await Donation.findOne({ reference: input.reference });
  if (!donation) throw new AppError("Donation not found", 404);

  if (input.provider === "paystack") {
    if (!env.paystackKey) throw new AppError("Paystack secret key not configured", 500);

    const response = await axios.get(`${env.paystackBaseUrl}/transaction/verify/${input.reference}`, {
      headers: { Authorization: `Bearer ${env.paystackKey}` },
    });

    const { status, gateway_response: gatewayResponse } = response.data.data;

    donation.gatewayResponse = response.data.data as Record<string, unknown>;
    donation.status = status === "success" ? "success" : status === "failed" ? "failed" : "pending";
    donation.verifiedAt = donation.status === "success" ? new Date() : undefined;
    await donation.save();

    return {
      provider: "paystack",
      status: donation.status,
      reference: donation.reference,
      gatewayResponse,
    };
  }

  // Stripe
  const stripe = getStripeClient();
  try {
    const paymentIntent = await stripe.paymentIntents.retrieve(input.reference);

    donation.gatewayResponse = paymentIntent;

    if (paymentIntent.status === "succeeded") {
      donation.status = "success";
      donation.verifiedAt = new Date();
    } else if (paymentIntent.status === "canceled" || paymentIntent.status === "requires_payment_method") {
      donation.status = "failed";
    } else {
      donation.status = "pending";
    }

    await donation.save();

    return {
      provider: "stripe",
      status: donation.status,
      reference: donation.reference,
      clientSecret: paymentIntent.client_secret,
      paymentIntent,
    };
  } catch (error) {
    logger.error("Stripe verification error", error);
    throw new AppError("Unable to verify Stripe payment", 502);
  }
};
