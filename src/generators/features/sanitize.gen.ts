import { FileOutput } from "../../types/index.js";

export function generateSanitize(): FileOutput[] {
  return [
    {
      path: "src/middlewares/sanitize.middleware.ts",
      content: `import mongoSanitize from "express-mongo-sanitize";
import { Request, Response, NextFunction } from "express";

export const sanitizeMongo = mongoSanitize({
  replaceWith: "_",
  allowDots: true,
});

export const sanitizeXSS = (req: Request, _res: Response, next: NextFunction) => {
  const clean = (obj: Record<string, any>): Record<string, any> => {
    const result: Record<string, any> = {};
    for (const [key, value] of Object.entries(obj)) {
      if (typeof value === "string") {
        result[key] = value
          .replace(/</g, "&lt;")
          .replace(/>/g, "&gt;")
          .replace(/"/g, "&quot;")
          .replace(/'/g, "&#x27;");
      } else if (typeof value === "object" && value !== null) {
        result[key] = clean(value);
      } else {
        result[key] = value;
      }
    }
    return result;
  };

  if (req.body) req.body = clean(req.body);
  if (req.query) req.query = clean(req.query as Record<string, any>);
  if (req.params) req.params = clean(req.params);

  next();
};
`,
    },
  ];
}
