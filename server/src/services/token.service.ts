import jwt from "jsonwebtoken";
import { env } from "../config/env";

interface TokenPayload {
  id: string;
  email: string;
  role?: string;
}

export const signAccessToken = (payload: TokenPayload): string => {
  return jwt.sign(
    {
      email: payload.email,
      role: payload.role
    },
    env.jwtSecret,
    {
      expiresIn: env.jwtExpiresIn,
      subject: payload.id
    }
  );
};

