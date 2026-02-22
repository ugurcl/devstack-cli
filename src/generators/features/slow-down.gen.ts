import { FileOutput } from "../../types/index.js";

export function generateSlowDown(): FileOutput[] {
  return [
    {
      path: "src/middlewares/slowDown.middleware.ts",
      content: `import slowDown from "express-slow-down";

export const speedLimiter = slowDown({
  windowMs: 15 * 60 * 1000,
  delayAfter: 50,
  delayMs: (hits) => (hits - 50) * 500,
});
`,
    },
  ];
}
