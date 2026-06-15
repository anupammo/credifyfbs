// Shared auth validation helpers: password policy, phone normalization, slugify.

// Password must be >=8 and contain at least one uppercase, one lowercase,
// one digit, and one special character.
const PASSWORD_POLICY =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/;

export function isStrongPassword(password: string): boolean {
  return PASSWORD_POLICY.test(password);
}

// Normalize a phone number to digits only. If the result is 11 digits and
// begins with a leading "1" (US country code), drop that leading 1.
export function normalizePhone(phone: string): string {
  let digits = phone.replace(/\D/g, "");
  if (digits.length === 11 && digits.startsWith("1")) {
    digits = digits.slice(1);
  }
  return digits;
}

// Build a URL-safe slug from arbitrary text.
export function slugify(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60);
}
