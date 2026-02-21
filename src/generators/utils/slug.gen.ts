import { FileOutput } from "../types/index.js";

export function generateSlug(): FileOutput[] {
  return [
    {
      path: "src/utils/slug.util.ts",
      content: `import { Model } from "mongoose";

const TR_MAP: Record<string, string> = {
  "ş": "s", "Ş": "S", "ç": "c", "Ç": "C", "ğ": "g", "Ğ": "G",
  "ü": "u", "Ü": "U", "ö": "o", "Ö": "O", "ı": "i", "İ": "I",
};

export const generateSlug = (text: string): string => {
  let result = text;
  for (const [from, to] of Object.entries(TR_MAP)) {
    result = result.split(from).join(to);
  }
  return result
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
};

export const generateUniqueSlug = async (
  text: string,
  model: Model<any>,
  field = "slug"
): Promise<string> => {
  const base = generateSlug(text);
  let slug = base;
  let counter = 1;

  while (await model.exists({ [field]: slug })) {
    counter++;
    slug = \`\${base}-\${counter}\`;
  }

  return slug;
};
`,
    },
  ];
}
