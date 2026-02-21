import { FileOutput } from "../../types/index.js";

export function generateValidate(): FileOutput[] {
  return [
    {
      path: "src/utils/validate.util.ts",
      content: `import { REGEX } from "./regex.util.js";

export const isEmail = (v: string) => REGEX.EMAIL.test(v);
export const isURL = (v: string) => REGEX.URL.test(v);
export const isSlug = (v: string) => REGEX.SLUG.test(v);
export const isUsername = (v: string) => REGEX.USERNAME.test(v);
export const isStrongPassword = (v: string) => REGEX.PASSWORD_STRONG.test(v);
export const isPhoneTR = (v: string) => REGEX.PHONE_TR.test(v);
export const isPhoneIntl = (v: string) => REGEX.PHONE_INTL.test(v);
export const isTCKimlik = (v: string) => REGEX.TC_KIMLIK.test(v);
export const isIPv4 = (v: string) => REGEX.IP_V4.test(v);
export const isIPv6 = (v: string) => REGEX.IP_V6.test(v);
export const isHexColor = (v: string) => REGEX.HEX_COLOR.test(v);
export const isCreditCard = (v: string) => REGEX.CREDIT_CARD.test(v.replace(/[\\s-]/g, ""));
export const isDateISO = (v: string) => REGEX.DATE_ISO.test(v);
export const isDateTR = (v: string) => REGEX.DATE_TR.test(v);
export const isTime24H = (v: string) => REGEX.TIME_24H.test(v);
export const isMongoId = (v: string) => REGEX.MONGO_OBJECT_ID.test(v);
export const isJWT = (v: string) => REGEX.JWT.test(v);
export const isAlphanumeric = (v: string) => REGEX.ALPHANUMERIC.test(v);
export const isNumeric = (v: string) => REGEX.NUMERIC.test(v);
`,
    },
  ];
}
