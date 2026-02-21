import { FileOutput } from "../../types/index.js";

export function generateCrypto(): FileOutput[] {
  return [
    {
      path: "src/utils/crypto.util.ts",
      content: `import { randomBytes, createHash } from "crypto";

export const generateRandomString = (length = 32): string => {
  return randomBytes(Math.ceil(length / 2))
    .toString("hex")
    .slice(0, length);
};

export const hashString = (value: string, algorithm = "sha256"): string => {
  return createHash(algorithm).update(value).digest("hex");
};

export const generateOTP = (length = 6): string => {
  const max = Math.pow(10, length);
  const num = Math.floor(Math.random() * max);
  return num.toString().padStart(length, "0");
};

export const generateResetToken = (): { token: string; hashedToken: string } => {
  const token = generateRandomString(40);
  const hashedToken = hashString(token);
  return { token, hashedToken };
};
`,
    },
  ];
}
