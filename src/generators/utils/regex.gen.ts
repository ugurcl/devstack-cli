import { FileOutput } from "../types/index.js";

export function generateRegex(): FileOutput[] {
  return [
    {
      path: "src/utils/regex.util.ts",
      content: `export const REGEX = {
  EMAIL: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$/,
  URL: /^https?:\\/\\/[^\\s/$.?#].[^\\s]*$/,
  SLUG: /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
  USERNAME: /^[a-zA-Z0-9_-]{3,20}$/,
  PASSWORD_STRONG: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$%^&*()_+\\-={}|;:'"<>,.?\\/~]).{8,}$/,
  PHONE_TR: /^0[5][0-9]{2}\\s?[0-9]{3}\\s?[0-9]{2}\\s?[0-9]{2}$/,
  PHONE_INTL: /^\\+[1-9]\\d{6,14}$/,
  TC_KIMLIK: /^[1-9]\\d{10}$/,
  IP_V4: /^(?:(?:25[0-5]|2[0-4]\\d|[01]?\\d\\d?)\\.){3}(?:25[0-5]|2[0-4]\\d|[01]?\\d\\d?)$/,
  IP_V6: /^([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}$/,
  HEX_COLOR: /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/,
  CREDIT_CARD: /^(?:4\\d{3}|5[1-5]\\d{2}|3[47]\\d{2}|6(?:011|5\\d{2}))[-\\s]?\\d{4}[-\\s]?\\d{4}[-\\s]?\\d{3,4}$/,
  DATE_ISO: /^\\d{4}-(?:0[1-9]|1[0-2])-(?:0[1-9]|[12]\\d|3[01])$/,
  DATE_TR: /^(?:0[1-9]|[12]\\d|3[01])[.\\/](?:0[1-9]|1[0-2])[.\\/]\\d{4}$/,
  TIME_24H: /^(?:[01]\\d|2[0-3]):[0-5]\\d(?::[0-5]\\d)?$/,
  MONGO_OBJECT_ID: /^[0-9a-fA-F]{24}$/,
  JWT: /^[A-Za-z0-9_-]+\\.[A-Za-z0-9_-]+\\.[A-Za-z0-9_-]+$/,
  HTML_TAG: /<\\/?([a-zA-Z][a-zA-Z0-9]*)\\b[^>]*>/g,
  WHITESPACE_TRIM: /^\\s+|\\s+$/g,
  CONSECUTIVE_SPACES: /\\s{2,}/g,
  ALPHANUMERIC: /^[a-zA-Z0-9]+$/,
  NUMERIC: /^\\d+$/,
  FILE_EXTENSION: /\\.([a-zA-Z0-9]+)$/,
};
`,
    },
  ];
}
