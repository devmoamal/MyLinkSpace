import jwt, { type SignOptions } from "jsonwebtoken";
import { env } from "@/config";
import type { JwtPayload } from "@/types";

const signOptions: SignOptions = {
  expiresIn: env.JWT_EXPIRES_IN,
};

export function signToken(payload: JwtPayload) {
  return jwt.sign(payload, env.JWT_SECRET, signOptions);
}

export function verifyToken(token: string) {
  return jwt.verify(token, env.JWT_SECRET) as JwtPayload;
}
