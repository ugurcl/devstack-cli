import { ProjectConfig, FileOutput } from "../../types/index.js";

export function generateSchemas(config: ProjectConfig): FileOutput[] {
  const files: FileOutput[] = [
    {
      path: "src/schemas/common.schema.ts",
      content: `import { z } from "zod";

export const objectIdSchema = z
  .string()
  .regex(/^[0-9a-fA-F]{24}$/, "Invalid ObjectId");

export const emailSchema = z
  .string()
  .trim()
  .toLowerCase()
  .email("Invalid email address");

export const passwordSchema = z
  .string()
  .min(6, "Password must be at least 6 characters")
  .max(100, "Password must be at most 100 characters");

export const paginationSchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(10),
});

export const sortSchema = z.object({
  sort: z.string().optional(),
  fields: z.string().optional(),
});
`,
    },
  ];

  if (config.auth) {
    files.push({
      path: "src/schemas/auth.schema.ts",
      content: `import { z } from "zod";
import { emailSchema, passwordSchema } from "./common.schema.js";

export const registerSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters").max(50),
  email: emailSchema,
  password: passwordSchema,
});

export const loginSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, "Password is required"),
});

export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
`,
    });
  }

  return files;
}
