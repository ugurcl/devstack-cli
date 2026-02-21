import { FileOutput } from "../../types/index.js";

export function generateTransform(): FileOutput[] {
  return [
    {
      path: "src/utils/transform.util.ts",
      content: `import { REGEX } from "./regex.util.js";

const TR_MAP: Record<string, string> = {
  "ş": "s", "Ş": "S", "ç": "c", "Ç": "C", "ğ": "g", "Ğ": "G",
  "ü": "u", "Ü": "U", "ö": "o", "Ö": "O", "ı": "i", "İ": "I",
};

export const extractEmails = (text: string): string[] => {
  return text.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}/g) || [];
};

export const extractURLs = (text: string): string[] => {
  return text.match(/https?:\\/\\/[^\\s/$.?#][^\\s]*/g) || [];
};

export const extractHashtags = (text: string): string[] => {
  return (text.match(/#[a-zA-Z0-9_]+/g) || []).map((t) => t.slice(1));
};

export const extractMentions = (text: string): string[] => {
  return (text.match(/@[a-zA-Z0-9_]+/g) || []).map((m) => m.slice(1));
};

export const stripHTML = (text: string): string => {
  return text.replace(REGEX.HTML_TAG, "").replace(/&[a-z]+;/gi, "");
};

export const maskEmail = (email: string): string => {
  const [local, domain] = email.split("@");
  if (!domain) return email;
  return local[0] + "***@" + domain;
};

export const maskPhone = (phone: string): string => {
  const digits = phone.replace(/\\D/g, "");
  if (digits.length < 7) return phone;
  return digits.slice(0, 4) + "***" + digits.slice(-2);
};

export const maskCreditCard = (card: string): string => {
  const digits = card.replace(/\\D/g, "");
  if (digits.length < 13) return card;
  return digits.slice(0, 4) + " **** **** " + digits.slice(-4);
};

export const normalizeWhitespace = (text: string): string => {
  return text.replace(REGEX.WHITESPACE_TRIM, "").replace(REGEX.CONSECUTIVE_SPACES, " ");
};

export const toCamelCase = (str: string): string => {
  return str
    .replace(/[-_\\s]+(.)?/g, (_, c) => (c ? c.toUpperCase() : ""))
    .replace(/^[A-Z]/, (c) => c.toLowerCase());
};

export const toSnakeCase = (str: string): string => {
  return str
    .replace(/([a-z])([A-Z])/g, "$1_$2")
    .replace(/[-\\s]+/g, "_")
    .toLowerCase();
};

export const toKebabCase = (str: string): string => {
  return str
    .replace(/([a-z])([A-Z])/g, "$1-$2")
    .replace(/[_\\s]+/g, "-")
    .toLowerCase();
};

export const toPascalCase = (str: string): string => {
  return str
    .replace(/[-_\\s]+(.)?/g, (_, c) => (c ? c.toUpperCase() : ""))
    .replace(/^[a-z]/, (c) => c.toUpperCase());
};

export const toTitleCase = (str: string): string => {
  return str.replace(/\\b\\w/g, (c) => c.toUpperCase());
};

export const toSlug = (str: string): string => {
  let result = str;
  for (const [from, to] of Object.entries(TR_MAP)) {
    result = result.split(from).join(to);
  }
  return result
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
};
`,
    },
  ];
}
