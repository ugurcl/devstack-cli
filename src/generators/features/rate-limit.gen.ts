import { FileOutput } from "../../types/index.js";

export function generateRateLimit(): FileOutput[] {
  return [
    {
      path: "src/middlewares/rateLimiter.middleware.ts",
      content: `import rateLimit from "express-rate-limit";

export const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: { status: "error", message: "Too many requests, try again later" },
});
`,
    },
  ];
}
