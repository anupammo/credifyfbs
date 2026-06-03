import crypto from "crypto";

export function signPayload(body: string): string {
  const secret = process.env.HMAC_SECRET;
  if (!secret) throw new Error("HMAC_SECRET is not set");
  return crypto.createHmac("sha256", secret).update(body).digest("hex");
}

export function verifyPayloadSignature(body: string, signature: string): boolean {
  const expected = signPayload(body);
  return crypto.timingSafeEqual(Buffer.from(expected, "hex"), Buffer.from(signature, "hex"));
}
